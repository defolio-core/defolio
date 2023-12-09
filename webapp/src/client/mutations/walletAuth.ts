import { api } from "../api"

export const createAuthNonce = async () => {
  const { data } = await api.post<{
    nonceSessionId: string,
    nonce: string
  }>('/auth/nonce');
  return data;
};

export const verifyAuth = async (
  input: {
    nonceSessionId: string,
    message: string,
    signature: string,
  }
) => {
  const { data } = await api.post<{ token: string }>('/auth/verify', input);
  return data;
}
