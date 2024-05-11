import React from 'react';
import OfertaSection from '@/components/ofertaSection';
import ImageCoworkMobile from '@/components/imageCoworkMobile';

const HeaderMain: React.FC = () => {
  return (
    <div className="flex bg-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4"> {/* Agregamos un margen derecho para separar los componentes */}
          <OfertaSection />
        </div>
        <div className="w-full md:w-1/2 md:ml-4"> {/* Agregamos un margen izquierdo para separar los componentes */}
          <ImageCoworkMobile />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
