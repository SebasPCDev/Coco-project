import Image from "next/image";
import React from "react";

const ImageCoworkMobile: React.FC = () => {
  return (
    <div className="image-showcase flex items-center justify-center">
      <Image src="/intento1.png" alt="Coco+" width="400" height="400" />
    </div>
  );
};

export default ImageCoworkMobile;
