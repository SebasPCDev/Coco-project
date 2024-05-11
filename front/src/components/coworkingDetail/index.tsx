import generateTimeOptions from "../../../utils/timeoptions/generateTimeOptions";
import IResponseCoworking from "../../../utils/types/coworkingsResponse";

const CoworkingDetailCard = ({
  coworking,
}: {
  coworking: IResponseCoworking;
}) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200 mt-8 md:w-4/5 md:mx-auto sm:my-8 mx-4 bg-white p-8">
      <img
        className="w-full h-64 object-cover mb-8"
        src={coworking.thumbnail || "https://via.placeholder.com/300"}
        alt="Thumbnail"
      />
      <div className="text-xl font-semibold text-gray-800 mb-4">
        {coworking.name}
      </div>
      <div className="text-lg text-gray-700 mb-4">{coworking.address}</div>
      <div className="text-lg text-gray-700 mb-4">
        Teléfono: {coworking.phone}
      </div>
      <div className="text-lg text-gray-700 mb-4">Email: {coworking.email}</div>
      <div className="text-lg text-gray-700 mb-4">
        Horario: {coworking.open} - {coworking.close}
      </div>
      <div className="text-lg text-gray-700 mb-4">
        Capacidad: {coworking.capacity}
      </div>
      <div className="text-lg text-gray-700 mb-4">
        Estado: {coworking.status}
      </div>
      {coworking.message && (
        <div className="text-lg text-gray-700 mb-4">
          Mensaje: {coworking.message}
        </div>
      )}
      <div className="mt-8 flex items-center">
        <select
          name="hour"
          required={true}
          className="border-2 border-gray-400 py-3 px-6 rounded-lg mr-4 focus:outline-none text-lg">
          <option value="">Selecciona una hora</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg focus:outline-none text-lg">
          Reservar
        </button>
      </div>
    </div>
  );
};

export default CoworkingDetailCard;
