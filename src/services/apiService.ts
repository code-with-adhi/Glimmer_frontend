import axios, { AxiosResponse } from "axios";

// --- TYPE DEFINITIONS ---

// Represents the full user object returned from the backend
export interface User {
  id: string;
  email: string;
  firstName: string;
  gender?: string;
  dateOfBirth: string;
  profile?: {
    bio?: string;
  };
}

// Data for the registration form
export interface UserData {
  firstName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender?: string;
}

// Data for the login form
export interface LoginData {
  email: string;
  password: string;
}

// Data shape of the login response from the backend
export interface LoginResponse {
  token: string;
}

// Data for updating a user's profile
export interface ProfileData {
  bio: string;
}

// --- API FUNCTIONS ---

const API_URL = "/api/users";
const PROFILE_API_URL = "/api/profiles";

/**
 * Sends a registration request to the backend.
 * @param userData The user's registration data.
 */
export const registerUser = (
  userData: UserData
): Promise<AxiosResponse<User>> => {
  return axios.post(`${API_URL}/register`, userData);
};

/**
 * Sends a login request to the backend.
 * @param loginData The user's login credentials.
 */
export const loginUser = (
  loginData: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post(`${API_URL}/login`, loginData);
};

/**
 * Fetches the currently authenticated user's profile data.
 * Requires a JWT to be sent in the headers.
 */
export const getMe = (): Promise<AxiosResponse<User>> => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/me`, config);
};

/**
 * Updates the currently authenticated user's profile.
 * Requires a JWT to be sent in the headers.
 * @param profileData The profile data to update.
 */
export const updateProfile = (profileData: ProfileData) => {
  const token = localStorage.getItem("token");
  return axios.put(`${PROFILE_API_URL}/me`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
