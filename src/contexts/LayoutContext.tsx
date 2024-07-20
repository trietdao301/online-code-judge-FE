import React, { createContext, useContext, useEffect, useState } from "react";

type LayoutContextType = {
  header: string;
  setHeader: (code: string) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<string>("");

  return (
    <LayoutContext.Provider
      value={{
        header,
        setHeader,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error(
      "useProblemEditor must be used within a LayoutContextProvider",
    );
  }
  return context;
}
