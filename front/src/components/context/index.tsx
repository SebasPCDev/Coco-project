import { createContext, useState, useEffect, useContext } from "react";

interface IUserContext {
  user: {
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
  };
  token: string;
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
  token: "",
});
