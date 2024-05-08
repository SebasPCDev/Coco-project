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
  user: IUser;
  setuser: (value: IUser) => void;
  token: string;
  setToken: (value: string) => void;
}

const userContext = createContext<IUserContext>({
  user: {
    id: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    position: "",
    recoveryToken: null,
    activationDate: null,
    role: "",
    status: "",
  },

  setuser: () => {},

  token: "",

  setToken: () => {},
});

const UserProvider = ({ children }: any) => {
  const [user, setuser] = useState<IUser>({
    id: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    position: "",
    recoveryToken: null,
    activationDate: null,
    role: "",
    status: "",
  });

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = Cookie.get("token");
    const user = Cookie.get("user");
    if (token) {
      setToken(token);
    }
    if (user) {
      setuser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    Cookie.set("user", JSON.stringify(user));
    Cookie.set("token", token);
  }, [user, token]);

  return (
    <userContext.Provider value={{ user, setuser, token, setToken }}>
      {children}
    </userContext.Provider>
  );

};

const useUserContext = () => useContext(userContext);

export { UserProvider, useUserContext };