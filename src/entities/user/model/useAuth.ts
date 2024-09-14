import { cacheUtil, cacheKey } from "~/src/shared/lib/browser";
import { useToastStore } from "~/src/shared/ui/toast";
import { getLoginData, getSessionData, getTokenData } from "../api";
import { FetchError } from "ofetch";
import type { AuthError } from "../config";

const NAMESPACE = "auth";

const getDefaultState = () => {
  return {
    token: "",
    expiresAt: "",
    sessionId: "",
    loading: false,
  };
};

export const useAuthStore = defineStore(NAMESPACE, {
  state: () => getDefaultState(),

  actions: {
    async auth({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<void> {
      this.loading = true;

      try {
        const tokenRequest = await getTokenData();
        this.token = tokenRequest.request_token;
        this.expiresAt = tokenRequest.expires_at;

        await getLoginData(username, password, this.token);

        const sessionRequest = await getSessionData(this.token);
        this.sessionId = sessionRequest.session_id;

        cacheUtil.set(cacheKey.appTokenData, {
          token: this.token,
          expiresAt: this.expiresAt,
          sessionId: this.sessionId,
        });

        await navigateTo("/");
      } catch (error: unknown) {
        if (error instanceof FetchError) {
          const data: AuthError = error.data;
          this.setError(data.status_message);
        }
      } finally {
        this.loading = false;
      }
    },

    logout(): void {
      this.resetState();
      cacheUtil.remove(cacheKey.appTokenData);
    },

    getDataFromLSAndSetInStore(): void {
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

    setError(err: string): void {
      useToastStore().addToast({
        id: Math.random(),
        variant: "danger",
        content: err,
        duration: 3500,
      });
      this.resetState();
    },

    resetState(): void {
      this.$reset();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
