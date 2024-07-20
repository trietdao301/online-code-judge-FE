import axios from "axios";

const BASE_URL = "http://localhost:8080";

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
  const response = await axios.get(`${BASE_URL}/test-case/${testUUID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data);
  return response.data;
};

export const getTestCaseListByProblemUUID = async (problemUUID: string) => {
  const response = await axios.get(
    `${BASE_URL}/test-case-list/${problemUUID}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  console.log(response.data);
  return response.data as GetTestCaseListResponse;
};
