import React, { useContext, useState } from "react";
import { createContext } from "react";

interface ContextInterface {
  result: number;
  setResult: React.Dispatch<React.SetStateAction<number>>;
  ageMin: string | null;
  setAgeMin: React.Dispatch<React.SetStateAction<string | null>>;
  ageMax: string | null;
  setAgeMax: React.Dispatch<React.SetStateAction<string | null>>;
  race: string | null;
  setRace: React.Dispatch<React.SetStateAction<string | null>>;
  expectedSalary: string | null;
  setExpectedSalary: React.Dispatch<React.SetStateAction<string | null>>;
  minHeight: string | null;
  setMinHeight: React.Dispatch<React.SetStateAction<string | null>>;
}

const formContext = createContext<ContextInterface | undefined>(undefined);

function AppContext({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<number>(0);
  const [ageMin, setAgeMin] = useState<string | null>("");
  const [ageMax, setAgeMax] = useState<string | null>("");
  const [race, setRace] = useState<string | null>("");
  const [expectedSalary, setExpectedSalary] = useState<string | null>("");
  const [minHeight, setMinHeight] = useState<string | null>("");

  return (
    <formContext.Provider
      value={{
        result,
        setResult,
        ageMin,
        setAgeMin,
        ageMax,
        setAgeMax,
        race,
        setRace,
        expectedSalary,
        setExpectedSalary,
        minHeight,
        setMinHeight,
      }}
    >
      {children}
    </formContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(formContext);
  if (!context) {
    throw new Error(
      "useFormContext must be used within an AppContext provider"
    );
  }
  return context;
};

export default AppContext;
