import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./userContext";

export interface Baby {
  _id: string;
  nickname: string;
  dueDate: Date;
  isActive: boolean;
  userId: string;
}

interface BabyContextProps {
  babies: Baby[];
  createPregnancy: (nickname: string, dueDate: Date) => Promise<void>;
  getBabiesByUser: () => Promise<void>;
  setActiveBaby: (id: string) => Promise<void>;
  followBaby: (followBabyCode: string) => Promise<void>;
  shareFollowBaby: (babyId: string) => Promise<string>;
  pregnancyData: {
    totalDaysPregnant: number;
    percentageComplete: number;
    weekOfPregnancy: number;
    formattedStartDate: string;
  } | null;
}

const BabyContext = createContext<BabyContextProps>({
  babies: [],
  createPregnancy: async () => {},
  getBabiesByUser: async () => {},
  setActiveBaby: async () => {},
  followBaby: async () => {},
  shareFollowBaby: async () => "",
  pregnancyData: null,
});

interface BabyProviderProps {
  children: React.ReactNode;
}

export const useBaby = () => useContext(BabyContext);

export const BabyProvider: React.FC<BabyProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [babies, setBabies] = useState<Baby[]>([]);
  const [pregnancyData, setPregnancyData] = useState<any>(null);

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
        await getBabiesByUser();
        await setActiveBaby(createdBaby._id);
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
      if (response.ok) {
        const data = await response.json();
        await getBabiesByUser();
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

  const calculatePregnancyData = () => {
    const activeBaby = babies.find((baby) => baby.isActive);
    const dueDate = activeBaby ? activeBaby.dueDate : null;

    if (!dueDate) {
      return null;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const startDate = new Date(dueDate);
    startDate.setDate(startDate.getDate() - 280);
    const formattedStartDate = startDate.toISOString().split("T")[0];

    const totalTimePregnant = Math.abs(today.getTime() - startDate.getTime());
    const totalDaysPregnant = Math.ceil(totalTimePregnant / oneDay);
    const percentageComplete = Math.round((totalDaysPregnant / 280) * 100);
    const weekOfPregnancy = Math.floor(totalDaysPregnant / 7);

    return {
      totalDaysPregnant,
      percentageComplete,
      weekOfPregnancy,
      formattedStartDate,
    };
  };

  const getBabiesByUserCallback = useCallback(getBabiesByUser, []);

  useEffect(() => {
    const fetchDataAndCalculatePregnancy = async () => {
      try {
        if (user?._id) {
          await getBabiesByUserCallback();
          const data = calculatePregnancyData();
          setPregnancyData(data);
        }
      } catch (error) {
        console.error("Error fetching or calculating pregnancy data:", error);
      }
    };

    fetchDataAndCalculatePregnancy();
  }, [user, getBabiesByUserCallback, babies]);

  useEffect(() => {
    getBabiesByUserCallback();
  }, [getBabiesByUserCallback]);

  return (
    <BabyContext.Provider
      value={{
        babies,
        createPregnancy,
        getBabiesByUser,
        setActiveBaby,
        followBaby,
        shareFollowBaby,
        pregnancyData,
      }}
    >
      {children}
    </BabyContext.Provider>
  );
};
