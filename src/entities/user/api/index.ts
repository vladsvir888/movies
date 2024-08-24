import type { TokenData, LoginData, SessionData } from "../config";

export const getTokenData = async (): Promise<TokenData> => {
  const { $api } = useNuxtApp();
  return await $api("/authentication/token/new");
};

export const getLoginData = async (
  username: string,
  password: string,
  token: string,
): Promise<LoginData> => {
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

export const getSessionData = async (token: string): Promise<SessionData> => {
  const { $api } = useNuxtApp();
  return await $api("/authentication/session/new", {
    method: "POST",
    body: {
      request_token: token,
    },
  });
};
