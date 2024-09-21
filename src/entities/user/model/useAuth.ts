import { useToastStore } from "~/src/shared/ui/toast";
import { getLoginData, getSessionData, getTokenData } from "../api";
import { FetchError } from "ofetch";
import { type AuthError, authSessionId } from "../config";

const NAMESPACE = "auth";

const getDefaultState = () => {
  return {
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

        await getLoginData(username, password, tokenRequest.request_token);

        const sessionRequest = await getSessionData(tokenRequest.request_token);
        this.sessionId = sessionRequest.session_id;

        const cookie = useCookie(authSessionId, {
          expires: new Date(tokenRequest.expires_at),
        });
        cookie.value = this.sessionId;

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
      useCookie(authSessionId).value = null;
    },

    getSessionIdAndSetInStore() {
      const cookie = useCookie(authSessionId);

      if (!cookie.value) {
        return;
      }

      this.sessionId = cookie.value;
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
