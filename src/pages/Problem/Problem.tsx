import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { Problem as ProblemType, getProblem } from "../../services";
import { ConfigProvider, message } from "antd";
import LeftContainer from "./LeftContainerProblem";
import RightContainer from "./RightContainerProblem";
import "./Problem.css";
import { useProblemContext } from "../../contexts/ProblemContext";

export default function Problem() {
  const { param_problem_uuid } = useParams<{ param_problem_uuid: string }>();
  const { setHeader } = useLayoutContext();

  const {
    setDescription,
    displayName,
    setDisplayName,
    setProblemUUID,
    submissionSnippetList,
    setSubmissionSnippetList,
  } = useProblemContext();

  useEffect(() => {
    if (displayName) {
      setHeader(displayName);
      setProblemUUID(param_problem_uuid ? param_problem_uuid : "");
    }
  }, [displayName]);

  useEffect(() => {
    const fetchProblemByUUID = async () => {
      if (param_problem_uuid) {
        try {
          const resData = await getProblem(param_problem_uuid);
          const problemObj: ProblemType = resData.Problem;
          console.log(problemObj.displayName);
          setDescription(problemObj.description);
          setDisplayName(problemObj.displayName);
          setSubmissionSnippetList(problemObj.submissionSnippetList);
        } catch (err) {
          setDescription("");
          setDisplayName("");
          message.error("Failed to fetch this problem");
        }
      }
    };

    fetchProblemByUUID();
  }, []); // Include problemUUID in dependency array

  return (
    <div className={"problem-container"}>
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm

          token: {
            // Seed Token
            colorPrimary: "#000E2E",
            borderRadius: 2,

            colorText: "#FFFFFF",
          },
        }}
      >
        <LeftContainer />
        <RightContainer />
      </ConfigProvider>
    </div>
  );
}
