import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSession,
  CreateSessionRequest,
  CreateSessionResponse,
  Role,
} from "../services";
import { message } from "antd";



type User = {
  username: string;
  accountUUID: string;
};

type AuthContextType = {
  role: Role | null;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(() => {
    return localStorage.getItem("role") as Role;
  });
  const [user, setUser] = useState<User | null>(() => {
    return {
      username: localStorage.getItem("user"),
      accountUUID: localStorage.getItem("accountUUID"),
    } as User;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const login = async (username: string, password: string) => {
    const req: CreateSessionRequest = {
      Username: username,
      Password: password,
    };
    try {
      const response: CreateSessionResponse = await createSession(req);
      console.log(response);
      if (response && response.Token) {
        setUser({
          username: response.Username,
          accountUUID: response.AccountUUID,
        });
        setToken(response.Token);
        setRole(response.Role as Role);
        localStorage.setItem("user", response.Username);
        localStorage.setItem("accountUUID", response.AccountUUID);
        localStorage.setItem("token", response.Token);
        localStorage.setItem("role", response.Role as Role);
        message.info(`Login as ${req.Username}`);
      }
      // Indicate successful login
      else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      message.error(`Invalid credentials`);
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);

    // Clear auth data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("accountUUID");
    localStorage.removeItem("problemUUID");
    localStorage.removeItem("problemSubmissionTemplateCode");
    localStorage.removeItem("problemTestCode");
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }
  return context;
}
