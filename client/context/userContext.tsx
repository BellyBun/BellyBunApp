import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
interface UserContextProps {
  user: User | null;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  signup: async () => {},
  login: async () => {},
  signout: async () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const checkLoggedIn = async () => {
    try {
      // Retrieve token from AsyncStorage
      const storedToken = await AsyncStorage.getItem("authToken");

      if (storedToken) {
        const response = await fetch("http://localhost:3000/api/users/auth", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("authToken", userData.token);
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("authToken", userData.token);
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Sign out function
  const signout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");

      const response = await fetch("http://localhost:3000/api/users/signout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        login,
        signout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return userContext;
};
