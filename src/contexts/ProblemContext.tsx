import React, { createContext, useContext, useEffect, useState } from "react";
import { Submission, SubmissionSnippet, DataType } from "../services";

type ProblemContextType = {
  description: string;
  setDescription: (content: string) => void;

  displayName: string;
  setDisplayName: (name: string) => void;

  problemUUID: string;
  setProblemUUID: (UUID: string) => void;

  codeContent: string;
  setCodeContent: (content: string) => void;

  submission: Submission | null;
  setSubmission: (submission: Submission) => void;

  submissionSnippetList: SubmissionSnippet[];
  setSubmissionSnippetList: (list: SubmissionSnippet[]) => void;

  activeTab: string;
  setActiveTab: (key: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  disableSubmit: boolean;
  setDisableSubmit: (value: boolean) => void;
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export function ProblemProvider({ children }: { children: React.ReactNode }) {
  const [description, setDescription] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [submissionSnippetList, setSubmissionSnippetList] = useState<
    SubmissionSnippet[]
  >([]);
  const [problemUUID, setProblemUUIDState] = useState<string>(() => {
    return localStorage.getItem("problemUUID") || "";
  });
  const setProblemUUID = (UUID: string) => {
    localStorage.setItem("problemUUID", UUID);
    setProblemUUIDState(UUID);
  };
  const [codeContent, setCodeContent] = useState<string>("");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  return (
    <ProblemContext.Provider
      value={{
        description,
        setDescription,
        displayName,
        setDisplayName,
        problemUUID,
        setProblemUUID,
        codeContent,
        setCodeContent,
        submission,
        setSubmission,
        submissionSnippetList,
        setSubmissionSnippetList,
        activeTab,
        setActiveTab,
        currentPage,
        setCurrentPage,
        disableSubmit,
        setDisableSubmit,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export function useProblemContext() {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error(
      "useProblemContext must be used within a ProblemContextProvider",
    );
  }
  return context;
}
