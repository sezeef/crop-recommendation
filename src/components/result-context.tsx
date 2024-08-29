"use client";

import { createContext, useContext, useState } from "react";

type ResultContextType = {
  result: {
    recommendation: number;
  };
  setResult: React.Dispatch<
    React.SetStateAction<{
      recommendation: number;
    }>
  >;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const useResult = () => {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error("Context.Provider not setup properly");
  }
  return context;
};

export const ResultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [result, setResult] = useState({
    recommendation: -1,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ResultContext.Provider value={{ 
      result,
      setResult,
      isLoading,
      setIsLoading
    }}>
      {children}
    </ResultContext.Provider>
  );
};
