import { useUserContext } from "@/components/context";
import PostActivateCowork from "../../../utils/posts/postActivateCowork";
import IResponseRequest from "../../../utils/types/responseRequets";
import Swal from "sweetalert2";

export const RequestsCow = ({ cowork, fetchData }) => {
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
        const result = await PostActivateCowork({ Id, token });
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
        {cowork.name} {cowork.lastname}
      </h2>
      <section className="rounded-lg p-2 bg-gray-100">
        {/* Contenedor de información */}
        <div className="bg-white p-4 rounded-lg shadow grid grid-cols-2">
          <p className="text-gray-700">
            <strong>Correo Electrónico:</strong> {cowork.email || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Teléfono:</strong> {cowork.phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Identificación:</strong> {cowork.identification || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Posición:</strong> {cowork.position || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Nombre de la Empresa:</strong> {cowork.companyName || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Correo Electrónico de la Empresa:</strong>
            {cowork.companyEmail || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Teléfono de la Empresa:</strong>
            {cowork.companyPhone || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Sector Empresarial:</strong>
            {cowork.businessSector || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Cantidad de Beneficiarios:</strong>
            {cowork.quantityBeneficiaries || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Tipo:</strong> {cowork.type || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Estado:</strong> {cowork.status || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Observación:</strong> {cowork.observation || "N/A"}
          </p>
        </div>
        <footer className="mt-4 flex justify-end">
          <button className="button is-ghost mr-4">Decline</button>
          <button
            onClick={handleClick}
            className="bg-custom-secondary text-custom-white py-3 px-6 rounded-lg text-xl font-bold"
            id={cowork.id}
          >
            Aprobar
          </button>
        </footer>
      </section>
    </div>
  );
};

export default RequestsCow;
