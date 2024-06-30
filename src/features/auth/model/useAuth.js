import { useRequest } from "~/src/shared/api";
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "~/src/shared/lib/browser";

const NAMESPACE = "auth";

const getDefaultState = () => {
  return {
    surname: "",
    password: "",
    token: "",
    expiresAt: "",
    sessionId: "",
    error: "",
    loading: false,
  };
};

export const useAuthStore = defineStore(NAMESPACE, {
  state: () => getDefaultState(),

  actions: {
    async auth(data) {
      const config = useRuntimeConfig();

      this.loading = true;
      this.error = "";

      this.surname = data.surname;
      this.password = data.password;

      const { data: tokenRequest, error: tokenRequestError } = await useRequest(
        "/authentication/token/new"
      );

      if (tokenRequestError.value) {
        this.setError(tokenRequestError.value);
        return;
      }

      this.token = tokenRequest.value.request_token;
      this.expiresAt = tokenRequest.value.expires_at;

      const { error: loginRequestError } = await useRequest(
        "/authentication/token/validate_with_login",
        {
          method: "POST",
          body: JSON.stringify({
            ...data.value,
            request_token: this.token,
          }),
        }
      );

      if (loginRequestError.value) {
        this.setError(loginRequestError.value);
        return;
      }

      const { data: sessionRequest, error: sessionRequestError } =
        await useRequest("/authentication/session/new", {
          method: "POST",
          body: JSON.stringify({
            request_token: this.token,
          }),
        });

      if (sessionRequestError.value) {
        this.setError(sessionRequestError.value);
        return;
      }

      this.sessionId = sessionRequest.value.session_id;

      setItemInLocalStorage(config.public.appTokenDataKey, {
        token: this.token,
        expiresAt: this.expiresAt,
        sessionId: this.sessionId,
      });

      this.loading = false;

      await navigateTo("/");
    },

    logout() {
      const config = useRuntimeConfig();

      this.resetState();
      removeItemFromLocalStorage(config.public.appTokenDataKey);
    },

    getDataFromLSAndSetInStore() {
      const config = useRuntimeConfig();
      const authData = getItemFromLocalStorage(config.public.appTokenDataKey);

      if (!authData) {
        return;
      }

      const currentDate = new Date();
      const expireTokenDate = new Date(authData.expiresAt);

      if (currentDate > expireTokenDate) {
        removeItemFromLocalStorage(config.public.appTokenDataKey);
      } else {
        this.token = authData.token;
        this.expiresAt = authData.expiresAt;
        this.sessionId = authData.sessionId;
      }
    },

    setError(err) {
      this.resetState();
      this.error = err;
    },

    resetError() {
      this.error = "";
    },

    resetState() {
      Object.assign(this, getDefaultState());
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
