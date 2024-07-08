import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "~/src/shared/lib/browser";
import { getLoginData, getSessionData, getTokenData } from "../api";

const NAMESPACE = "auth";

const getDefaultState = () => {
  return {
    username: "",
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

      this.username = data.value.username;
      this.password = data.value.password;

      try {
        const tokenRequest = await getTokenData();
        this.token = tokenRequest.request_token;
        this.expiresAt = tokenRequest.expires_at;

        await getLoginData(this.username, this.password, this.token);

        const sessionRequest = await getSessionData(this.token);
        this.sessionId = sessionRequest.session_id;

        setItemInLocalStorage(config.public.appTokenDataKey, {
          token: this.token,
          expiresAt: this.expiresAt,
          sessionId: this.sessionId,
        });

        this.loading = false;

        await navigateTo("/");
      } catch (error) {
        this.setError(error.response._data.status_message);
      }
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
