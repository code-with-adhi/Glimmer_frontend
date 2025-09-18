import axios, { AxiosResponse } from "axios";

// Define a type for the user data we get back from the backend
interface User {
  id: string;
  email: string;
  firstName: string;
}

// Define a type for the registration data we send
interface UserData {
  firstName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender?: string;
}

// --- NEW ---
// Define a type for the login data we send
interface LoginData {
  email: string;
  password: string;
}

// Define a type for the login response we get back
interface LoginResponse {
  token: string;
}
// ---------

const API_URL = "/api/users";

const registerUser = (userData: UserData): Promise<AxiosResponse<User>> => {
  return axios.post(`${API_URL}/register`, userData);
};

// --- NEW ---
const loginUser = (
  loginData: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post(`${API_URL}/login`, loginData);
};
// ---------

// Export everything
export { registerUser, loginUser };
export type { User, UserData, LoginData, LoginResponse };
