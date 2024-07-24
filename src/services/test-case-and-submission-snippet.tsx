import { message } from "antd";
import axios from "axios";
import configData from "../config.json";

const BASE_URL =   "http://94.72.127.243:443"

export type CreateTestCaseAndSubmissionSnippetRequest = {
  CodeSnippet: string;
  CodeTest: string;
  OfProblemUUID: string;
  Language: string;
};

const getToken = () => {
  return localStorage.getItem("token"); // or however you're storing the token
};

export const createTestCaseAndSubmissionSnippet = async (
  req: CreateTestCaseAndSubmissionSnippetRequest,
) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${BASE_URL}/test-case-and-submission-snippet`,
      req,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log(response.data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};
