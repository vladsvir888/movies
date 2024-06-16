import { useRequest } from "~/src/shared/api";
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
} from "~/src/shared/lib/browser";

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

export const useAuth = defineStore("auth", {
  state: () => getDefaultState(),

  actions: {
    resetState() {
      Object.assign(this, getDefaultState());
    },

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

    setError(err) {
      this.resetState();
      this.error = err;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
