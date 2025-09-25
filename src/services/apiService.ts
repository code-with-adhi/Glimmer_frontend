import axios, { AxiosResponse } from "axios";

// --- TYPE DEFINITIONS ---
export interface SportAndTeam {
  sport: string;
  team: string;
}

export interface Profile {
  bio?: string;
  movieGenres?: string[];
  favoriteMovies?: string[];
  musicGenres?: string[];
  favoriteArtists?: string[];
  favoriteSports?: SportAndTeam[];
  hobbies?: string[];
  nicheHobby?: string;
  questionnaireAnswers?: Record<number, string>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  dateOfBirth: string;
  gender?: string;
  profile?: Profile;
  topPicks?: any[];
}

export interface UserData {
  firstName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserDiscoveryDTO {
  user: User;
  compatibilityScore: number;
}

export interface InterestProfileUpdateRequest {
  movieGenres?: string[];
  favoriteMovies?: string[];
  musicGenres?: string[];
  favoriteArtists?: string[];
  favoriteSports?: SportAndTeam[];
  hobbies?: string[];
  nicheHobby?: string;
}

export interface QuestionnaireUpdateRequest {
  answers: Record<number, Character>;
}

// --- API URLs ---
const USERS_API_URL = "/api/users";
const PROFILES_API_URL = "/api/profiles";
const DISCOVERY_API_URL = "/api/discovery";
const TOPPICKS_API_URL = "/api/toppicks";
const ME_API_URL = "/api/me";

// --- API FUNCTIONS ---
export const registerUser = (
  userData: UserData
): Promise<AxiosResponse<User>> => {
  return axios.post(`${USERS_API_URL}/register`, userData);
};

export const loginUser = (
  loginData: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post(`${USERS_API_URL}/login`, loginData);
};

export const getMe = (): Promise<AxiosResponse<User>> => {
  const token = localStorage.getItem("token");
  return axios.get(`${USERS_API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = (profileData: { bio: string }) => {
  const token = localStorage.getItem("token");
  return axios.put(`${PROFILES_API_URL}/me`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDiscoveryFeed = (): Promise<
  AxiosResponse<UserDiscoveryDTO[]>
> => {
  const token = localStorage.getItem("token");
  return axios.get(`${DISCOVERY_API_URL}/feed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserById = (userId: string): Promise<AxiosResponse<User>> => {
  const token = localStorage.getItem("token");
  return axios.get(`${USERS_API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const likeUser = (likedUserId: string) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${DISCOVERY_API_URL}/like/${likedUserId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getTopPicksByCategory = (
  category: string
): Promise<AxiosResponse<TopPick[]>> => {
  const token = localStorage.getItem("token");
  return axios.get(TOPPICKS_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { category },
  });
};

export const addUserTopPick = (
  topPickId: number
): Promise<AxiosResponse<UserTopPick>> => {
  const token = localStorage.getItem("token");
  return axios.post(`${ME_API_URL}/toppicks`, null, {
    headers: { Authorization: `Bearer ${token}` },
    params: { topPickId },
  });
};

export const removeUserTopPick = (userTopPickId: number) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${ME_API_URL}/toppicks/${userTopPickId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateInterestProfile = (data: InterestProfileUpdateRequest) => {
  const token = localStorage.getItem("token");
  return axios.put(`${PROFILES_API_URL}/me/interests`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateQuestionnaire = (data: QuestionnaireUpdateRequest) => {
  const token = localStorage.getItem("token");
  return axios.put(`${PROFILES_API_URL}/me/questionnaire`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
