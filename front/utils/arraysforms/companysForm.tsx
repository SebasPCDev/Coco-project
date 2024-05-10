export interface elementForm {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export const formDataCompanies: elementForm[] = [
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
    label: "Nombre de la empresa",
    type: "text",
    placeholder: "Nombre de la compañía o coworking",
    required: true,
  },
  {
    name: "companyEmail",
    label: "Correo de la empresa",
    type: "email",
    placeholder: "Email de la compañía o coworking",
    required: true,
  },
  {
    name: "companyPhone",
    label: "Teléfono de la empresa",
    type: "text",
    placeholder: "Phone de la compañía o coworking",
    required: true,
  },
  {
    name: "quantityBeneficiaries",
    label: "Cantidad de beneficiarios",
    type: "number",
    placeholder: "Cantidad de empleados con el beneficio",
    required: false,
  },
  {
    name: "businessSector",
    label: "Sector empresarial",
    type: "text",
    placeholder: "Sector empresarial",
    required: false,
  },
  {
    name: "size",
    label: "Cantidad de empleados",
    type: "number",
    placeholder: "Cantidad de empleados",
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
