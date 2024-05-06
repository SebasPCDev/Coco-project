import {
    RiHomeLine,
  RiInstagramLine,
  RiLockLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiUserLine,
} from "@remixicon/react";
export interface elementForm {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  icon?: JSX.Element;
}

export const companiesFormsArray: elementForm[] = [
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
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "calle 123 # 45-67",
    required: true,
    icon: <RiHomeLine />,
  },
  {
    name: "message",
    label: "Message",
    type: "text",
    placeholder: "quiero informacion",
    required: true,
  },
  {
    name: "socialMedia",
    label: "socialMedia",
    type: "text",
    placeholder: "https://www.instagram.com/ejemplo/",
    required: true,
    icon: <RiInstagramLine />,
    },
    {
      name: "number_beneficiaries",
      label: "number_beneficiaries",
      type: "number",
      placeholder: "2",
      required: true,
      icon: <RiMapPinLine />,
    },
    {
        name: "sector",
        label: "sector",
        type: "text",
        placeholder: "sector",
        required: true,
        icon: <RiMapPinLine />,
    }
];
