"use client";
// impotamos el array que mapearemos para crear los inputs y los labels del formulario
import { formDataCompanies } from "../../../utils/arraysforms/companysForm";

// importamos los hooks
import { useState, useEffect } from "react";

// importamos la interface para tipar el estado del formulario
import ICompaniesInfo from "../../../utils/types/companiesFormInterface";

// importamos la petición post a requests/company
import PostCompany from "../../../utils/posts/postCompany";

// importamos la validacion de formularios
import companyValidation from "../../../utils/formValidation/companyValidation";
import ICompaniesErrorInfo from "../../../utils/types/companiesFormErrorInterface";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css'; 

const CompaniesForm = () => {
  const router = useRouter();
  const [companiesInfo, setCompaniesInfo] = useState<ICompaniesInfo>({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    position: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    quantityBeneficiaries: 0,
    businessSector: "",
    size: 0,
    message: "",
    status: "pending",
    observation: "Esto es una observacion",
    type: "",
  });

  //el estado para los errores aun no se sta utilizando
  const [companiesInfoError, setCompaniesInfoError] =
    useState<ICompaniesErrorInfo>({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      identification: "",
      role: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      quantityBeneficiaries: "",
      businessSector: "",
      size: "",
      message: "",
      type: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCompaniesInfo({
      ...companiesInfo,
      [name]: value,
    });
    console.log(companiesInfo);
  };

  const handleChangePhone = (name: string, value: string) => {
    setCompaniesInfo({
      ...companiesInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(companiesInfo);

    try {
      const response = await PostCompany(companiesInfo);
      Swal.fire({
        title: response.responseCompany,
        text: "la respuesta se enviara a tu correo electronico",
        icon: "success",
      });
      router.push("/");
    } catch (error) {
      console.log("Hubo un error en la petición", error);
    }
  };

  useEffect(() => {
    const errors = companyValidation(companiesInfo);
    setCompaniesInfoError(errors);
    console.log(errors);
  }, [companiesInfo]);

  return (
    <>
      <form className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold text-center mb-8 col-span-2">Soy una Empresa</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formDataCompanies.map(({ name, label, type, placeholder, required }) => (
            <div key={name} className={`flex flex-col ${name === "message" ? "md:col-span-2" : ""}`}>
              <label htmlFor={name} className="block text-gray-700 font-bold mb-2 text-lg">
                {label}
              </label>
              {name === "phone" || name === "companyPhone" ? (
                <PhoneInput                    
                  defaultCountry="ar"
                  name={name}
                  value={companiesInfo[name as keyof ICompaniesInfo].toString()}
                  onChange={(phone) => handleChangePhone(name, phone)}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={required}
                  className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-6 px-8 rounded-lg text-xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    name === "message" ? "md:col-span-2" : ""
                  }`}
                  onChange={handleChange}
                  value={companiesInfo[name as keyof ICompaniesInfo]}
                />
              )}
              <p className="text-red-500 mt-2 text-lg">{companiesInfoError[name as keyof ICompaniesInfo]}</p>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-lime-400 hover:bg-lime-500 text-white font-bold py-4 px-8 rounded-lg text-xl focus:outline-none focus:shadow-outline mt-8"
          type="submit"
        >
          Enviar Solicitud
        </button>
      </form>
    </>
  );
};

export default CompaniesForm;
