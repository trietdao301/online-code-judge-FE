import axios from "axios";
import Test from "../pages/Test";
import { message } from "antd";
import configData from "../config.json";

const BASE_URL =   "http://94.72.127.243:443"

export type Test = {
  UUID: string;
  ofProblemUUID: string;
  testFileContent: string;
  createdAt: string;
  language: string;
};

export type GetTestCaseListResponse = {
  TestCaseList: Test[];
};

const token = localStorage.getItem("token");

export const getTestCaseByUUID = async (testUUID: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/test-case/${testUUID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    message.error("fail to get test case")
    return {
      Test: {
      
    }}
  }
};

export const getTestCaseListByProblemUUID = async (problemUUID: string): Promise<GetTestCaseListResponse> => {
  try {
    const response = await axios.get<GetTestCaseListResponse>(
      `${BASE_URL}/test-case-list/${problemUUID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
  catch (error) {
    console.error('Error fetching test case list:', error);
    // Return a valid GetTestCaseListResponse with an empty TestCaseList
    return { TestCaseList: [] };
  }
};