import { message } from "antd";
import axios from "axios";
import { error } from "console";

const BASE_URL = "http://localhost:8080";

export type CreateSessionRequest = {
  Username: string;
  Password: string;
};
export type CreateSessionResponse = {
  Username: string;
  Token: string;
  Role: string;
  AccountUUID: string;
};

export type CreateAccountRequest = {
  Username: string;
  Password: string;
  Role: string;
};

export type CreateAccountResponse = {
  Username: string;
  Role: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export const createSession = async (req: CreateSessionRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createAccount = async (
  req: CreateAccountRequest,
): Promise<CreateAccountResponse> => {
  return axios
    .post(`${BASE_URL}/account`, req)
    .then((res) => {
      console.log(res.data);
      return res.data as CreateAccountResponse;
    })
    .catch((error) => {
      console.error("Error creating account:", error);
      throw error;
    });
};
