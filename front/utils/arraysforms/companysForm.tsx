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
    name: "role",
    label: "Role",
    type: "text",
    placeholder: "Cargo dentro de la empresa",
    required: true,
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    placeholder: "Nombre de la compañía o coworking",
    required: true,
  },
  {
    name: "company_email",
    label: "Company Email",
    type: "email",
    placeholder: "Email de la compañía o coworking",
    required: true,
  },
  {
    name: "company_phone",
    label: "Company Phone",
    type: "text",
    placeholder: "Phone de la compañía o coworking",
    required: true,
  },
  {
    name: "quantity_beneficiaries",
    label: "Quantity of Beneficiaries",
    type: "number",
    placeholder: "Cantidad de empleados con el beneficio",
    required: false,
  },
  {
    name: "business_sector",
    label: "Business Sector",
    type: "text",
    placeholder: "Sector empresarial",
    required: false,
  },
  {
    name: "size",
    label: "Size",
    type: "number",
    placeholder: "Cantidad de empleados",
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
