// api.ts
import axios from "./axios.customize.ts";
import type { AxiosResponse } from "axios";

interface LoginResponse {
  EC: number;
  EM: string;
  access_token: string;
  user: {
    email: string;
    name: string;
  };
}

const loginApi = (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  const URL_API = "/v1/api/login";
  return axios.post(URL_API, { email, password });
};
interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  EC: number;
  EM: string;
  message?: string;
}

const createUserApi = (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse<CreateUserResponse>> => {
  const URL_API = "/v1/api/register";
  const data: CreateUserPayload = { name, email, password };
  return axios.post(URL_API, data);
};

interface User {
  _id: string;
  email: string;
  name: string;
  role?: string;
}

const getUserApi = (): Promise<AxiosResponse<User[]>> => {
  const URL_API = "/v1/api/user";
  return axios.get(URL_API);
};

export { loginApi, createUserApi, getUserApi };
