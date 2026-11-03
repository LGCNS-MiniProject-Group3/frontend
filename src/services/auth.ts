import { DEFAULT_ERROR_MESSAGE } from '@/constants/errorMessages';
import { axiosInstance } from '@/lib';
import type { AuthResponse, LoginRequest, SignupRequest } from '@/types/auth';

export async function signup(body: SignupRequest) {
  await axiosInstance.post<AuthResponse>('/api/auth/signup', body);
}

export async function login(body: LoginRequest) {
  const response = await axiosInstance.post<AuthResponse>('/api/auth/login', body);
  const accessToken = String(response.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
  const refreshToken = String(response.headers['refresh-token'] ?? '');
  if (!accessToken || !refreshToken) throw new Error(DEFAULT_ERROR_MESSAGE);
  return { ...response.data, accessToken, refreshToken };
}

export const logout = async (refreshToken: string): Promise<void> => {
  await axiosInstance.post('/api/auth/logout', { refreshToken });
};
