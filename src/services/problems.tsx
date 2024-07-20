import { message } from "antd";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export type DataType = {
  key: string;
  language: string;
  submission: React.ReactNode;
  result: string;
  status: number;
  createdAt: string;
};

export type CreateNewProblemRequest = {
  DisplayName: string;
  Description: string;
  AuthorAccountUUID: string;
  TimeLimitInMillisecond: Number;
  MemoryLimitInByte: Number;
};

export type TestCaseData = {
  TestCaseUUID: string;
  Language: string;
};

export type SubmissionSnippet = {
  submissionSnippetUUID: string;
  language: string;
};

export type Problem = {
  UUID: string;
  displayName: string;
  description: string;
  testCaseList: TestCaseData[];
  authorAccountUUID: string;
  timeLimitInMillisecond: Number;
  memoryLimitInByte: Number;
  createdAt: string;
  updatedAt: string;
  submissionSnippetList: SubmissionSnippet[];
};

export type GetProblemListResponse = {
  ListOfProblem: Problem[];
  TotalCount: Number;
};

const getToken = () => {
  return localStorage.getItem("token"); // or however you're storing the token
};

export const getProblem = async (problemUUID: string) => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/problem/${problemUUID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createProblem = async (problemData: CreateNewProblemRequest) => {
  const token = getToken();
  const response = await axios.post(`${BASE_URL}/problem`, problemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProblem = async (problemUUID: string) => {
  const token = getToken();
  const response = await axios.delete(`${BASE_URL}/problem/${problemUUID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getProblemList = async (): Promise<GetProblemListResponse> => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/problem-list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as GetProblemListResponse;
  } catch (err) {
    console.error("Failed to fetch problem list:", err);
    message.error("Failed to fetch problem list");
    return { ListOfProblem: [], TotalCount: 0 };
  }
};
