import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

export interface Baby {
  _id: string;
  nickname: string;
  dueDate: Date;
  userId: string;
}

interface BabyContextProps {
  baby?: Baby;
  babies: Baby[];
  createPregnancy: (nickname: string, dueDate: Date) => Promise<void>;
  getBabiesByUser: (userID: string) => Promise<void>;
}

const BabyContext = createContext<BabyContextProps>({
  baby: undefined,
  babies: [],
  createPregnancy: async () => {},
  getBabiesByUser: async () => {},
});

interface BabyProviderProps {
  children: React.ReactNode;
}

export const useBaby = () => useContext(BabyContext);

export const BabyProvider: React.FC<BabyProviderProps> = ({ children }) => {
  const [baby, setBaby] = useState<Baby>();
  const { user } = useUser();
  const [babies, setBabies] = useState<Baby[]>([]);

  const createPregnancy = async (nickname: string, dueDate: Date) => {
    try {
      const response = await fetch("http://localhost:3000/api/baby/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, dueDate }),
      });

      if (response.ok) {
        const createdBaby = await response.json();
        console.log("Created Baby:", createdBaby);
        setBaby(createdBaby);
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error creating pregnancy:", error);
    }
  };

  const getBabiesByUser = async () => {
    try {
      if (user?._id) {
        const response = await fetch(
          `http://localhost:3000/api/baby/${user.email}`
        );
        if (response.ok) {
          const fetchedBabies = await response.json();
          setBabies(fetchedBabies);
        } else {
          console.error("Failed to fetch babies:", response.status);
        }
      }
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  };

  useEffect(() => {
    // Fetch babies when the user changes
    getBabiesByUser();
  }, [user?._id]);

  return (
    <BabyContext.Provider
      value={{
        baby,
        babies,
        createPregnancy,
        getBabiesByUser,
      }}
    >
      {children}
    </BabyContext.Provider>
  );
};
