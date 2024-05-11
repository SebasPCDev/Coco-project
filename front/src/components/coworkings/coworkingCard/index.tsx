import IResponseCoworking from "../../../../utils/types/coworkingsResponse";
import Link from "next/link";

const CoworkingCard = ({ coworking }: { coworking: IResponseCoworking }) => {
  return (
    <Link href={`/coworkings/${coworking.id}`}>
      <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <img
          className="w-full h-48 object-cover"
          src={coworking.thumbnail || "https://via.placeholder.com/300"}
          alt="Thumbnail"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold">{coworking.name}</h2>
          <p className="text-gray-600">{coworking.address}</p>
          <p className="text-gray-600">Teléfono: {coworking.phone}</p>
          <p className="text-gray-600">Email: {coworking.email}</p>
          <p className="text-gray-600">
            Horario: {coworking.open} - {coworking.close}
          </p>
          <p className="text-gray-600">Capacidad: {coworking.capacity}</p>
          <p className="text-gray-600">Estado: {coworking.status}</p>
          {coworking.message && (
            <p className="text-gray-600">Mensaje: {coworking.message}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CoworkingCard;
