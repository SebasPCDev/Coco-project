import { RiLockLine, RiMailLine } from "@remixicon/react";
export interface IRegisterForm {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export const LoginFormArray: IRegisterForm[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Password",
  },
];
