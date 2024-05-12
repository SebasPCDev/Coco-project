import React from "react";
import OfertaSection from "@/components/ofertaSection";
import ImageCoworkMobile from "@/components/imageCoworkMobile";

const HeaderMain: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-full flex flex-col md:flex-row items-center">
        <div className="w-full px-60 md:w-1/2 mb-8 md:mb-0 md:mr-4">
          {/* Agregamos un margen derecho para separar los componentes */}
          <OfertaSection />
        </div>
        <div className="w-full md:w-1/2 md:ml-4">
          {" "}
          {/* Agregamos un margen izquierdo para separar los componentes */}
          <ImageCoworkMobile />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
