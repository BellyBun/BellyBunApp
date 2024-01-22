import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

export interface Baby {
  _id: string;
  nickname: string;
  dueDate: Date;
  isActive: boolean;
  userId: string;
}

interface BabyContextProps {
  baby?: Baby;
  babies: Baby[];
  createPregnancy: (nickname: string, dueDate: Date) => Promise<void>;
  getBabiesByUser: () => Promise<void>;
  setActiveBaby: (id: string) => Promise<void>;
  followBaby: (followBabyCode: string) => Promise<void>;
  shareFollowBaby: (babyId: string) => Promise<string>;
}

const BabyContext = createContext<BabyContextProps>({
  baby: undefined,
  babies: [],
  createPregnancy: async () => {},
  getBabiesByUser: async () => {},
  setActiveBaby: async () => {},
  followBaby: async () => {},
  shareFollowBaby: async () => "",
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

  const setActiveBaby = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/baby/setActive/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Fetch the updated baby list after setting the active baby
        await getBabiesByUser();
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error setting active baby:", error);
    }
  };

  const followBaby = async (followBabyCode: string) => {
    try {
      console.log("Sending request to follow baby with code:", followBabyCode);

      const response = await fetch(
        `http://localhost:3000/api/baby/follow/${followBabyCode}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followBabyCode }),
        }
      );

      console.log("Response from server:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Data received from server:", data);
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error following baby:", error);
      throw error;
    }
  };

  const shareFollowBaby = async (babyId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/baby/share/${babyId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.followBabyCode;
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error sharing baby code:", error);
      throw error;
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
        setActiveBaby,
        followBaby,
        shareFollowBaby,
      }}
    >
      {children}
    </BabyContext.Provider>
  );
};
