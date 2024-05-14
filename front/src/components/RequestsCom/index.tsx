"use client";
import { useUserContext } from "@/components/context";
import PostActivateCowork from "../../../utils/posts/postActivateCowork";
import IResponseRequest from "../../../utils/types/responseRequets";
import Swal from "sweetalert2";
import PostActivateCompany from "../../../utils/posts/postActivateComapnies";

export const RequestsCom = ({ company, fetchData }) => {
  const { token } = useUserContext();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const Id = e.currentTarget.id;
    Swal.fire({
      title: "Seguro que desea aprobar la solicitud?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await PostActivateCompany({ Id, token });
        console.log(result);
        if (result) {
          Swal.fire("El coworking ha sido aprobado!", "", "success");
          fetchData();
        } else {
          Swal.fire("Hubo un error al aprobar el coworking", "", "error");
        }
        fetchData();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-4">
        {company.name} {company.lastname}
      </h2>
      <section className="rounded-lg p-2 bg-gray-100">
        <div className="bg-white p-4 rounded-lg shadow grid grid-cols-2">
          <p className="text-gray-700">
            <strong>Correo Electrónico:</strong> {company.email || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Teléfono:</strong> {company.phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Identificación:</strong> {company.identification || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Posición:</strong> {company.position || "N/A"}
          </p>
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
        <footer className="mt-4 flex justify-end">
          <button className="button is-ghost mr-4">Decline</button>
          <button
            onClick={handleClick}
            className="bg-custom-secondary text-custom-white py-3 px-6 rounded-lg text-xl font-bold"
            id={company.id}
          >
            Aprobar
          </button>
        </footer>
      </section>
    </div>
  );
};

export default RequestsCom;
