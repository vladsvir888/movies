import { authSessionId } from "../config";

export default defineNuxtPlugin(() => {
  addRouteMiddleware("auth", () => {
    if (useCookie(authSessionId).value) {
      return abortNavigation();
    }
  });
});
