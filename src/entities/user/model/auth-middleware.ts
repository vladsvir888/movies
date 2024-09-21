import { authSessionId } from "../config";

export default defineNuxtPlugin(() => {
  addRouteMiddleware("auth", () => {
    if (import.meta.client) {
      return;
    }

    if (useCookie(authSessionId).value) {
      return navigateTo("/");
    }
  });
});
