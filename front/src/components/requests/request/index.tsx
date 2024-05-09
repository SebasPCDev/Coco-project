"use client";
import IResponseRequest from "../../../../utils/types/responseRequets";

const CompanyList = ({ companies }: { companies: IResponseRequest[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Listado de Empresas</h1>
      <ul>
        {companies.map((company) => (
          <li
            key={company.id}
            className="bg-gray-100 p-4 rounded-lg mb-4 border-custom-secondary border-2">
            <h2 className="text-xl font-bold mb-2">
              {company.name} {company.lastname}
            </h2>
            <p>
              <strong>Correo Electrónico:</strong> {company.email || "N/A"}
            </p>
            <p>
              <strong>Teléfono:</strong> {company.phone || "N/A"}
            </p>
            <p>
              <strong>Identificación:</strong> {company.identification || "N/A"}
            </p>
            <p>
              <strong>Posición:</strong> {company.position || "N/A"}
            </p>
            <p>
              <strong>Nombre de la Empresa:</strong>{" "}
              {company.companyName || "N/A"}
            </p>
            <p>
              <strong>Correo Electrónico de la Empresa:</strong>{" "}
              {company.companyEmail || "N/A"}
            </p>
            <p>
              <strong>Teléfono de la Empresa:</strong>{" "}
              {company.companyPhone || "N/A"}
            </p>
            <p>
              <strong>Sector Empresarial:</strong>{" "}
              {company.businessSector || "N/A"}
            </p>
            <p>
              <strong>Cantidad de Beneficiarios:</strong>{" "}
              {company.quantityBeneficiaries || "N/A"}
            </p>
            <p>
              <strong>Tipo:</strong> {company.type || "N/A"}
            </p>
            <p>
              <strong>Estado:</strong> {company.status || "N/A"}
            </p>
            <p>
              <strong>Observación:</strong> {company.observation || "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
