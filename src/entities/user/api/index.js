export const getTokenData = async () => {
  const { $api } = useNuxtApp();
  return await $api("/authentication/token/new");
};

export const getLoginData = async (username, password, token) => {
  const { $api } = useNuxtApp();
  return await $api("/authentication/token/validate_with_login", {
    method: "POST",
    body: {
      username,
      password,
      request_token: token,
    },
  });
};

export const getSessionData = async (token) => {
  const { $api } = useNuxtApp();
  return await $api("/authentication/session/new", {
    method: "POST",
    body: {
      request_token: token,
    },
  });
};
