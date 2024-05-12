import "./style.css";
import "./style.css";
import { useUserContext } from "@/components/context";
import PostActivateCowork from "../../../utils/posts/postActivateCowork";
import IResponseRequest from "../../../utils/types/responseRequets";
import Swal from "sweetalert2";

export const RequestsCow =({cowork})=>{

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


    return(
        <div className="modal">
	<article className="modal-container">
		<header className="modal-container-header">
			<span className="modal-container-title">
				<svg aria-hidden="true" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z" fill="currentColor"></path>
				</svg>
				{cowork.name} 
			</span>
		</header>
		<section className="modal-container-body rtf">
		<h2 className="text-xl font-bold mb-4">
                {cowork.name} {cowork.lastname}
              </h2>
                <div>
                  <p className="text-gray-700">
                    <strong>Correo Electrónico:</strong>{" "}
                    {cowork.email || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> {cowork.phone || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Identificación:</strong>{" "}
                    {cowork.identification || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Posición:</strong> {cowork.position || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Nombre de la Empresa:</strong>{" "}
                    {cowork.companyName || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Correo Electrónico de la Empresa:</strong>{" "}
                    {cowork.companyEmail || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Teléfono de la Empresa:</strong>{" "}
                    {cowork.companyPhone || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Sector Empresarial:</strong>{" "}
                    {cowork.businessSector || "N/A"}
                  </p>
                </div>
				<div className="mb-4">
                <p className="text-gray-700">
                  <strong>Cantidad de Beneficiarios:</strong>{" "}
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
		</section>
		<footer className="modal-container-footer">
		<button className="button is-ghost">Decline</button>
			<button
                onClick={handleClick}
                className="bg-custom-secondary text-custom-white py-3 px-6 rounded-lg text-xl font-bold"
                id={cowork.id}
              >
                Aprobar
              </button>
		</footer>
	</article>
</div>
    )
}

export default RequestsCow;