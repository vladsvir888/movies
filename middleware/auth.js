export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
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
