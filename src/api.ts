import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (credentials: { email: string; password: string }) =>
  apiClient.post("/login", credentials);

export const fetchUsers = (page: number) =>
  apiClient.get(`/users?page=${page}`);

export const fetchUserDetail = (id: number) => apiClient.get(`/users/${id}`);

export const createUser = (user: { name: string; job: string }) =>
  apiClient.post("/users", user);

export const updateUser = (id: number, user: { name: string; job: string }) =>
  apiClient.put(`/users/${id}`, user);

export const deleteUser = (id: number) => apiClient.delete(`/users/${id}`);
