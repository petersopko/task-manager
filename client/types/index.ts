// Task-related types
export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: string;
  dueDate?: string | null;
  user?: any;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: string;
  dueDate: string | null;
}

// Auth-related types
export interface User {
  id: number;
  username?: string;
  email?: string;
  [key: string]: any;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  [key: string]: any;
}

// API response types
export interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: User;
}
