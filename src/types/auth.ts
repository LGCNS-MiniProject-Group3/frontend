export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}

export interface AuthResponse {
  userId: number;
  name: string;
  profileCompleted: boolean;
}
