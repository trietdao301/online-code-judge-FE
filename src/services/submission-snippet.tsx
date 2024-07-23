import { message } from "antd";
import axios from "axios";
import REACT_APP_BASE_URL from "../config.json"

const BASE_URL = "https://94.72.127.243:443";

export type GetSubmissionSnippetRequest = {
  SubmissionSnippetUUID: string;
};

export type GetSubmissionSnippetResponse = {
  CodeSnippet: string;
  Language: string;
};

const getToken = () => {
  return localStorage.getItem("token"); // or however you're storing the token
};
export const getSubmissionSnippet = async (
  req: GetSubmissionSnippetRequest,
): Promise<GetSubmissionSnippetResponse> => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${BASE_URL}/submission-snippet/${req.SubmissionSnippetUUID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data as GetSubmissionSnippetResponse;
  } catch (err) {
    return {} as GetSubmissionSnippetResponse;
  }
};
