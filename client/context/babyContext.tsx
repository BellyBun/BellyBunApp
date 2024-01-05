// BabyContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface Baby {
  id: string;
  name: string;
}

interface BabyContextProps {
  babies: Baby[];
  activeBabyId: string | null;
  fetchBabies: () => Promise<void>;
  setActiveBaby: (babyId: string) => void;
}

const BabyContext = createContext<BabyContextProps>({
  babies: [],
  activeBabyId: null,
  fetchBabies: async () => {},
  setActiveBaby: () => {},
});

interface BabyProviderProps {
  children: ReactNode;
}

export const BabyProvider: React.FC<BabyProviderProps> = ({ children }) => {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [activeBabyId, setActiveBabyId] = useState<string | null>(null);

  const fetchBabies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/get-babies", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const fetchedBabies = await response.json();
      setBabies(fetchedBabies);
    } catch (error) {
      console.error("Error fetching babies:", error.message);
      throw error;
    }
  };

  const setActiveBaby = (babyId: string) => {
    setActiveBabyId(babyId);
  };

  return (
    <BabyContext.Provider
      value={{ babies, activeBabyId, fetchBabies, setActiveBaby }}
    >
      {children}
    </BabyContext.Provider>
  );
};

export const useBaby = () => {
  const babyContext = useContext(BabyContext);
  if (!babyContext) {
    throw new Error("useBaby must be used within a BabyProvider");
  }
  return babyContext;
};
