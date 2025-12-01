"use client";

import { createContext, useState, useEffect } from "react";
import { UserProfileToken } from "@/Models/User";
import { toast } from "sonner";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Importação ajustada
import urlApi from "../../urlService";

type UserContextType = {
  user: UserProfileToken | null;
  token: string | null;
  registerUser: (email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  getRole: () => string | null;
};

type Props = {
  children: React.ReactNode;
};

interface DecodedToken {
  scope: string;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfileToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const registerUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${urlApi}` + "/register", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const userObj = {
        email: response.data.email,
        token: token,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setToken(token);
      setUser(userObj);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao cadastrar o usuário");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${urlApi}` + "/login", { email, password });
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      const userObj = {
        email: response.data.email,
        token: token,
        expiresIn: response.data.expiresIn,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setToken(token);
      setUser(userObj);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao realizar o login");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const getRole = () => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token) as DecodedToken;   
      return decoded.scope;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn, getRole }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
