// User types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserWithPassword extends User {
  password: string;
  created_at: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
}

// Protected route responses
export interface HelloResponse {
  message: string;
  user?: User;
}
