import React, { useState } from "react";
import IntlTelInput from "react-intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const IntlTelInputComponent: React.FC = () => {
  
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null); // Corregir el tipo de estado

  return (
    <div>
      <IntlTelInput
        initialValue={number}
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode} // Corregir la función de manejo del código de error
        initOptions={{
          initialCountry: "us",
          utilsScript: "/intl-tel-input/js/utils.js?1715508103106",
        }}
      />
      <p>Número: {number}</p>
      <p>Es válido: {isValid ? 'Sí' : 'No'}</p>
      
    </div>
  );
};

export default IntlTelInputComponent;
