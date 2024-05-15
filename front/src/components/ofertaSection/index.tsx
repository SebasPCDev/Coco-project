import React from 'react';
import Link from "next/link";

const OfertaSection: React.FC = () => {
  return (
    <div style={{padding: "2rem", maxWidth: "800px", marginInline: "auto", marginLeft: "8rem"}}>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
        Ofrece a tus equipos remotos acceso a <span className="text-green-500">espacios de trabajo flexibles</span>
      </h1>
      <p className="text-4xl text-gray-900 mb-8 max-w-4xl">
        Una suscripción, miles de escritorios y salas de reuniones. Paga solo por lo que usa tu equipo. Sin compromisos.
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/coworkingsForm"><button className="bg-gray-900 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-md text-2xl">
          Soy Coworking
        </button></Link>
        <Link href="/companiesForm"><button className="bg-gray-900 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-md text-2xl">
          Soy Empresa
        </button></Link>
      </div>
    </div>
  );
};

export default OfertaSection;
