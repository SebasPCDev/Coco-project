interface IResponseRequest {
  id: string | null;
  name: string | null;
  lastname: string | null;
  phone: string | null;
  email: string | null;
  identification: string | null;
  position: string | null;
  companyName: string | null;
  companyEmail: string | null;
  companyPhone: string | null;
  quantityBeneficiaries: number | null;
  businessSector: string | null;
  size: number | null;
  address: string | null;
  website: string | null;
  open: string | null;
  close: string | null;
  capacity: number | null;
  message: string | null;
  status: string | null;
  observation: string | null;
  type: string | null;
}

export default IResponseRequest;
