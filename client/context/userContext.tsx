import React, { createContext, useContext, useState, useEffect } from "react";
import { useAsyncStorageState } from "../hooks/useAscynStorageState";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isWelcomed: boolean;
}
interface UserContextProps {
  user: User | null;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  setIsWelcome: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  signup: async () => {},
  login: async () => {},
  signout: async () => {},
  setIsWelcome: async () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useAsyncStorageState<User | null>(null, "user");

  const checkLoggedIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/auth", {
        credentials: "include",
      });

      if (response.status === 204) {
        setUser(null);
      } else if (response.ok) {
        const user = await response.json();
        if (user.success) {
          setUser(user);
          console.log("in check:", user);
        }
      } else {
        console.log("Error status during checkLoggedIn:", response.status);
        setUser(null);
        console.error("Error checking login status:", response.statusText);
      }
    } catch (error) {
      console.log("Error during checkLoggedIn:", error.message);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
      console.log("new user:", user);
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log("User after login:", user);
      setUser(user);
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  };

  // Sign out function
  const signout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/signout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
      } else {
        console.error("Error during signout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  // Update isWelcome status
  const setIsWelcome = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        console.error("Error during update status:", response.statusText);
      }
    } catch (error) {
      console.error("Error during update status:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        login,
        signout,
        setIsWelcome,
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
