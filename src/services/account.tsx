import { message } from "antd";
import axios from "axios";
import { error } from "console";
import REACT_APP_BASE_URL from "../config.json"

//const BASE_URL =  "http://localhost:8080";
const BASE_URL = "http://94.72.127.243:8080";
export const AdminRole = "Admin";
export const ProblemSetterRole = "ProblemSetter";
export const ContestantRole = "Contestant";

export type Role = typeof AdminRole | typeof ProblemSetterRole | typeof ContestantRole;

export type CreateSessionRequest = {
  Username: string;
  Password: string;
};
export type CreateSessionResponse = {
  Username: string;
  Token: string;
  Role: Role;
  AccountUUID: string;
};

export type CreateAccountRequest = {
  Username: string;
  Password: string;
  Role: string;
};

export type CreateAccountResponse = {
  Username: string;
  Role: Role;

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
  req: CreateAccountRequest
): Promise<any> => {
  try {
    const response = await axios.post<any>(`${BASE_URL}/account`, req);
 
    return response
  } catch (error) {
    console.error("Error creating account:", error);
    throw error
  }
};