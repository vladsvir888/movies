import { cacheUtil, cacheKey } from "~/src/shared/lib/browser";

export default defineNuxtPlugin(() => {
  addRouteMiddleware((to) => {
    if (!to.path.includes("/sign-in")) {
      return;
    }

    const authData = cacheUtil.get(cacheKey.appTokenData);

    if (authData) {
      throw createError({
        statusCode: 404,
        fatal: true,
      });
    }
  });
});
