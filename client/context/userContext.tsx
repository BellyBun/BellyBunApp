// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextProps {
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  signUp: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null); // You can extend this to hold user information

  // Signup function
  const signUp = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
    } else {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
  };

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
