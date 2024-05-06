import {
  RiHomeLine,
  RiInstagramLine,
  RiLockLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiUserLine,
} from "@remixicon/react";
export interface IRegisterForm {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  icon?: JSX.Element;
}

export const registerFormArray: IRegisterForm[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Name",
    required: true,
    icon: <RiUserLine />,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+57 320500000",
    required: true,
    icon: <RiPhoneLine />,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
    icon: <RiMailLine />,
  },
  {
    name: "open",
    label: "Open",
    type: "text",
    placeholder: "10:00",
    required: true,
    icon: <RiMapPinLine />,
  },
  {
    name: "close",
    label: "Close",
    type: "text",
    placeholder: "22:00",
    required: true,
    icon: <RiMapPinLine />,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Street 1 - 50",
    required: true,
    icon: <RiHomeLine />,
  },
  {
    name: "message",
    label: "Message",
    type: "text",
    placeholder: "I'm interested in acquiring this service",
    required: true,
  },
  {
    name: "socialMedia",
    label: "Social Media",
    type: "text",
    placeholder: "https://www.instagram.com/example/",
    required: true,
    icon: <RiInstagramLine />,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    placeholder: "https://www.example.com",
    required: true,
  },
  {
    name: "max_capacity",
    label: "Max Capacity",
    type: "number",
    placeholder: "5",
    required: true,
    icon: <RiMapPinLine />,
  },
  {
    name: "type",
    label: "Type",
    type: "text",
    placeholder: "coworking",
    required: true,
    icon: <RiMapPinLine />,
  },
];
