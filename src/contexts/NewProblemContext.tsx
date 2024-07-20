import React, { createContext, useContext, useEffect, useState } from "react";

type ProblemEditorContextType = {
  problemTestCode: string;
  setProblemTestCode: (code: string) => void;
  problemSubmissionTemplateCode: string;
  setProblemSubmissionTemplateCode: (template: string) => void;
  clear: () => void;
};

const ProblemEditorContext = createContext<
  ProblemEditorContextType | undefined
>(undefined);

export function ProblemEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [problemTestCode, setProblemTestCode] = useState(() => {
    const savedProblem = localStorage.getItem("problemTestCode");
    return savedProblem !== null ? savedProblem : "";
  });

  useEffect(() => {
    localStorage.setItem("problemTestCode", problemTestCode);
  }, [problemTestCode]);

  const [problemSubmissionTemplateCode, setProblemSubmissionTemplateCode] =
    useState(() => {
      const savedProblem = localStorage.getItem(
        "problemSubmissionTemplateCode",
      );
      return savedProblem !== null ? savedProblem : "";
    });

  useEffect(() => {
    localStorage.setItem(
      "problemSubmissionTemplateCode",
      problemSubmissionTemplateCode,
    );
  }, [problemSubmissionTemplateCode]);

  const clear = () => {
    localStorage.removeItem("problemTestCode");
    localStorage.removeItem("problemSubmissionTemplateCode");
    setProblemTestCode("");
    setProblemSubmissionTemplateCode("");
  };

  return (
    <ProblemEditorContext.Provider
      value={{
        problemTestCode,
        problemSubmissionTemplateCode,
        setProblemTestCode,
        setProblemSubmissionTemplateCode,
        clear,
      }}
    >
      {children}
    </ProblemEditorContext.Provider>
  );
}

export function useProblemEditor() {
  const context = useContext(ProblemEditorContext);
  if (context === undefined) {
    throw new Error(
      "useProblemEditor must be used within a ProblemEditorProvider",
    );
  }
  return context;
}
