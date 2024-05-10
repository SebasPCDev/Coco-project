import { RiLockLine, RiMailLine } from "@remixicon/react";
export interface IRegisterForm {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  icon: JSX.Element;
}

export const LoginFormArray: IRegisterForm[] = [
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    placeholder: "Email",
    required: true,
    icon: <RiMailLine />,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Password",
    required: true,
    icon: <RiLockLine />,
  },
];
