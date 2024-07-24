import { message } from "antd";
import axios from "axios";
import configData from "../config.json";

const BASE_URL =   "https://94.72.127.243"

export type CreateSubmissionRequest = {
  ProblemUUID: string;
  Content: string;
  Language: string;
  AuthorAccountUUID: string;
};

type SubmissionStatus = -1 | 1 | 3;

export const SubmissionStatusError: SubmissionStatus = -1;
export const SubmissionStatusExecuting: SubmissionStatus = 1;
export const SubmissionStatusFinished: SubmissionStatus = 3;

export type Submission = {
  UUID: string;
  problemUUID: string;
  authorAccountUUID: string;
  content: string;
  language: string;
  status: SubmissionStatus;
  result: string;
  grading_result: string;
  created_time: number;
};

export type CreateSubmissionResponse = {
  Submission: Submission;
};

export type GetSubmissionRequest = {
  UUID: string;
};

export type GetSubmissionResponse = {
  Submission: Submission;
};

export type GetSubmissionListRequest = {
  problemUUID: string;
  authorAccountUUID: string;
};

export type GetSubmissionListResponse = {
  Submissions: Submission[];
};

const getToken = () => {
  return localStorage.getItem("token"); // or however you're storing the token
};

export const getSubmissionList = async (
  req: GetSubmissionListRequest,
): Promise<GetSubmissionListResponse> => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${BASE_URL}/submission-list/${req.problemUUID}/${req.authorAccountUUID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data as GetSubmissionListResponse;
  } catch (err) {
    message.error("Failed to get list of submissions");
    return { Submissions: [] };
  }
};

export const createSubmission = async (
  req: CreateSubmissionRequest,
): Promise<CreateSubmissionResponse> => {
  try {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}/submission`, req, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    console.error("Failed to create submission:", err);
    message.error("Failed to create submission");
    return {
      Submission: {
        UUID: "",
        problemUUID: "",
        authorAccountUUID: "",
        content: "",
        language: "",
        status: -1,
        result: "",
        grading_result: "",
        created_time: -1,
      },
    };
  }
};

export const getSubmission = async (
  req: GetSubmissionRequest,
): Promise<GetSubmissionResponse> => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/submission/${req.UUID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    message.error("Failed to get submission");
    return {
      Submission: {
        UUID: "",
        problemUUID: "",
        authorAccountUUID: "",
        content: "",
        language: "",
        status: -1,
        result: "",
        grading_result: "",
        created_time: -1,
      },
    };
  }
};
