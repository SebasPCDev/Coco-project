export interface elementForm {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export const formDataCoworkings: elementForm[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Name",
    required: true,
  },
  {
    name: "lastname",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Phone",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
    placeholder: "Número de documento",
    required: true,
  },
  {
    name: "position",
    label: "position",
    type: "text",
    placeholder: "Cargo dentro de la empresa",
    required: true,
  },
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "Nombre de la compañía o coworking",
    required: true,
  },
  {
    name: "companyEmail",
    label: "Company Email",
    type: "email",
    placeholder: "Email de la compañía o coworking",
    required: true,
  },
  {
    name: "companyPhone",
    label: "Company Phone",
    type: "text",
    placeholder: "Phone de la compañía o coworking",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Dirección",
    required: false,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    placeholder: "Sitio web",
    required: false,
  },
  {
    name: "open",
    label: "Opening Time",
    type: "time",
    placeholder: "Horario de apertura",
    required: false,
  },
  {
    name: "close",
    label: "Closing Time",
    type: "time",
    placeholder: "Horario de cierre",
    required: false,
  },
  {
    name: "capacity",
    label: "Capacity",
    type: "number",
    placeholder: "Cantidad de boxes",
    required: false,
  },
  {
    name: "message",
    label: "Message",
    type: "text",
    placeholder: "Message",
    required: false,
  },
];
