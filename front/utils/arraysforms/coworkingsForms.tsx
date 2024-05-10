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
    label: "Nombre",
    type: "text",
    placeholder: "Name",
    required: true,
  },
  {
    name: "lastname",
    label: "Apellido",
    type: "text",
    placeholder: "Last Name",
    required: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    type: "text",
    placeholder: "Phone",
    required: true,
  },
  {
    name: "email",
    label: "Correo electronico",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "identification",
    label: "Identificación",
    type: "text",
    placeholder: "Número de documento",
    required: true,
  },
  {
    name: "position",
    label: "Cargo",
    type: "text",
    placeholder: "Cargo dentro de la empresa",
    required: true,
  },
  {
    name: "companyName",
    label: "Nombre del coworking",
    type: "text",
    placeholder: "Nombre de la compañía o coworking",
    required: true,
  },
  {
    name: "companyEmail",
    label: "Correo del coworking",
    type: "email",
    placeholder: "Email de la compañía o coworking",
    required: true,
  },
  {
    name: "companyPhone",
    label: "Teléfono del coworking",
    type: "text",
    placeholder: "Phone de la compañía o coworking",
    required: true,
  },
  {
    name: "address",
    label: "Dirección",
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
    label: "Horario de apertura",
    type: "time",
    placeholder: "Horario de apertura",
    required: false,
  },
  {
    name: "close",
    label: "Horario de cierre",
    type: "time",
    placeholder: "Horario de cierre",
    required: false,
  },
  {
    name: "capacity",
    label: "Cantidad de boxes",
    type: "number",
    placeholder: "Cantidad de boxes",
    required: false,
  },
  {
    name: "message",
    label: "Mensaje",
    type: "text",
    placeholder: "Message",
    required: false,
  },
];
