import { cacheUtil, cacheKey } from "~/src/shared/lib/browser";
import { useToastStore } from "~/src/shared/ui/toast";
import { getLoginData, getSessionData, getTokenData } from "../api";

const NAMESPACE = "auth";

const getDefaultState = () => {
  return {
    username: "",
    password: "",
    token: "",
    expiresAt: "",
    sessionId: "",
    loading: false,
  };
};

export const useAuthStore = defineStore(NAMESPACE, {
  state: () => getDefaultState(),

  actions: {
    async auth(data) {
      this.loading = true;

      this.username = data.value.username;
      this.password = data.value.password;

      try {
        const tokenRequest = await getTokenData();
        this.token = tokenRequest.request_token;
        this.expiresAt = tokenRequest.expires_at;

        await getLoginData(this.username, this.password, this.token);

        const sessionRequest = await getSessionData(this.token);
        this.sessionId = sessionRequest.session_id;

        cacheUtil.set(cacheKey.appTokenData, {
          token: this.token,
          expiresAt: this.expiresAt,
          sessionId: this.sessionId,
        });

        await navigateTo("/");
      } catch (error) {
        this.setError(error.response._data.status_message);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.resetState();
      cacheUtil.remove(cacheKey.appTokenData);
    },

    getDataFromLSAndSetInStore() {
      const authData = cacheUtil.get(cacheKey.appTokenData);

      if (!authData) {
        return;
      }

      const currentDate = new Date();
      const expireTokenDate = new Date(authData.expiresAt);

      if (currentDate > expireTokenDate) {
        this.logout();
      } else {
        this.token = authData.token;
        this.expiresAt = authData.expiresAt;
        this.sessionId = authData.sessionId;
      }
    },

    setError(err) {
      useToastStore().addToast({
        id: Math.random(),
        variant: "danger",
        content: err,
        duration: 3500,
      });

      this.resetState();
    },

    resetState() {
      Object.assign(this, getDefaultState());
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
