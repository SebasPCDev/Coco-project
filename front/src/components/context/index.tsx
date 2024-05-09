"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Cookie from "js-cookie";

interface IUser {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  identification: string;
  position: string;
  recoveryToken: string | null;
  activationDate: string | null;
  role: string;
  status: string;
}

interface IUserContext {
  user: IUser | undefined;
  setUser: (value: IUser | undefined) => void;
  token: string | undefined;
  setToken: (value: string | undefined) => void;
}

const userContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
  token: undefined,
  setToken: () => {},
});

const UserProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const tokenFromCookie = Cookie.get("token");
    const userFromCookie = Cookie.get("user");

    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }

    if (userFromCookie) {
      try {
        setUser(JSON.parse(userFromCookie) as IUser);
      } catch (error) {
        setUser(undefined);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      Cookie.set("user", JSON.stringify(user));
    }
    if (token) {
      Cookie.set("token", token);
    }
  }, [user, token]);

  return (
    <userContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </userContext.Provider>
  );
};

const useUserContext = () => useContext(userContext);

export { UserProvider, useUserContext };
