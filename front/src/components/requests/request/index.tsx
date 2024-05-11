"use client";
import { useUserContext } from "@/components/context";
import PostActivateCowork from "../../../../utils/posts/postActivateCowork";
import IResponseRequest from "../../../../utils/types/responseRequets";
import Swal from "sweetalert2";

const CompanyList = ({ companies }: { companies: IResponseRequest[] }) => {
  const { token } = useUserContext();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const Id = e.currentTarget.id;
    Swal.fire({
      title: "Seguro que desea aprobar la solicitud?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await PostActivateCowork({ Id, token });
        Swal.fire("El coworking ha sido aprobado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    /*     e.preventDefault();
    const Id = e.currentTarget.id;
    const response = await PostActivateCowork({ Id, token });
    console.log(response); */
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Listado de Empresas</h1>
      <ul>
        {companies && companies.length === 0 ? (
          <h1>No hay solicitides pendientes</h1>
        ) : (
          companies.map((company) => (
            <li
              key={company.id}
              className="bg-white shadow-md rounded-lg mb-8 p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                {company.name} {company.lastname}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-700">
                    <strong>Correo Electrónico:</strong>{" "}
                    {company.email || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> {company.phone || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Identificación:</strong>{" "}
                    {company.identification || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Posición:</strong> {company.position || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Nombre de la Empresa:</strong>{" "}
                    {company.companyName || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Correo Electrónico de la Empresa:</strong>{" "}
                    {company.companyEmail || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Teléfono de la Empresa:</strong>{" "}
                    {company.companyPhone || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Sector Empresarial:</strong>{" "}
                    {company.businessSector || "N/A"}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Cantidad de Beneficiarios:</strong>{" "}
                  {company.quantityBeneficiaries || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Tipo:</strong> {company.type || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Estado:</strong> {company.status || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Observación:</strong> {company.observation || "N/A"}
                </p>
              </div>
              <button
                onClick={handleClick}
                className="bg-custom-secondary text-custom-white py-3 px-6 rounded-lg text-xl font-bold"
                id={company.id}
              >
                Aprobar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CompanyList;
