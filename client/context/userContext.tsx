// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  dueDate?: Date;
  // Add more user-related fields as needed
}

interface AuthContextProps {
  user: User | null;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signIn: (values: { email: string; password: string }) => Promise<void>;
  addUserInfo: (userId: string, userInfo: any) => Promise<void>; // Update the type of userInfo as needed
  addPregnancy: (
    userId: string,
    babyName: string,
    dueDate: Date
  ) => Promise<void>;
  getDueDate: () => Promise<Date | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  addUserInfo: async () => {},
  addPregnancy: async () => {},
  getDueDate: async () => null,
  signOut: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Signup function
  const signUp = async (username: string, email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/register", {
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
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  };

  // Signin function
  // Signin function
  const signIn = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 401) {
          // Unauthorized: Check if it's due to invalid username or password
          if (data.error === "Invalid username") {
            throw new Error("Username not found");
          } else if (data.error === "Invalid password") {
            throw new Error("Incorrect password");
          } else {
            throw new Error("Invalid username or password");
          }
        } else {
          throw new Error(data.error);
        }
      }

      // Perform any additional logic upon successful sign-in
      const userData = await response.json();
      console.log("Sign-in successful", userData);
      setUser(userData.user); // Set the user object here
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      throw error;
    }
  };

  const addUserInfo = async (userInfo: any) => {
    try {
      // Access the user information from the context
      const { user } = useContext(AuthContext);

      if (!user) {
        throw new Error("User not logged in");
      }

      const userId = user.id;

      const response = await fetch(`http://localhost:3000/add-info/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Perform any additional logic upon successful update of user info
      console.log("User information updated successfully");
      // You may handle additional logic or update state if needed
    } catch (error) {
      console.error("Error during update of user info:", error.message);
      throw error;
    }
  };

  // Add pregnancy function
  const addPregnancy = async (
    userId: string,
    babyName: string,
    dueDate: Date
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/create-baby/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ babyName, dueDate }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Perform any additional logic upon successful add pregnancy
      console.log("Pregnancy added successfully");
      // You may handle additional logic or update state if needed
    } catch (error) {
      console.error("Error during add pregnancy:", error.message);
      throw error;
    }
  };

  // Get due date function
  const getDueDate = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/get-due-date", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const { dueDate } = await response.json();
      return new Date(dueDate);
    } catch (error) {
      console.error("Error during get due date:", error.message);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    // Implement your logic for signing out here
    // ...

    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    // Handle response and perform necessary logic

    setUser(null); // Clear user state after signing out
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        addUserInfo,
        addPregnancy,
        getDueDate,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
