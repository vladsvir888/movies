import { getItemFromLocalStorage } from "~/src/shared/lib/browser";

export default defineNuxtPlugin(() => {
  addRouteMiddleware((to) => {
    if (!to.path.includes("/sign-in")) {
      return;
    }

    const config = useRuntimeConfig();
    const authData = getItemFromLocalStorage(config.public.appTokenDataKey);

    if (authData) {
      throw createError({
        statusCode: 404,
        fatal: true,
      });
    }
  });
});
