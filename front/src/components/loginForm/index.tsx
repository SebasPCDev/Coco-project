"use client";
import { LoginFormArray } from "../../../utils/arraysforms/loginForm";
import React, { use, useEffect, useState } from "react";
import ILoginForm from "../../../utils/types/loginFormInterface";
import PostLogin from "../../../utils/posts/postSignin";
import { useUserContext } from "../context";
import { useRouter } from "next/navigation";
import ILoginErrorForm from "../../../utils/types/loginFormErrorInterface";
import loginValidation from "../../../utils/formValidation/loginValidation";
import redirectionByRole from "../../../utils/ redirects/redirectByRole";
import Swal from "sweetalert2";

const LoginForm = () => {
  const router = useRouter();
  const { setUser, setToken } = useUserContext();
  const [LoginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const [LoginFormError, setLoginFormError] = useState<ILoginErrorForm>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...LoginForm, [name]: value });
    console.log(LoginForm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = loginValidation(LoginForm);
    setLoginFormError(errors);
    if (errors.email || errors.password) return;

    const data = await PostLogin(LoginForm);

    if (!data.error) {
      setUser(data.user);
      setToken(data.token);
      await Swal.fire({
        icon: "success",
        title: "Bienvenido",
        showConfirmButton: false,
        timer: 1500,
      });
      if (data.user) {
        const redirection = redirectionByRole(data.user.role);
        router.push(redirection);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <>
      <div className="bg-[url('../../public/LoginMobile.png')] md:bg-[url('../../public/FondoLoginCoco1.png')] h-screen bg-cover bg-center relative">
        <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full h-full relative">
          <form
            className="lg:w-1/2 md:3/4 sm:w-full w-1/2 px-8 pt-6 pb-8 mb-4 bg-custom-white rounded-2xl shadow-lg absolute top-0 left-0 transform translate-x-1/2 translate-y-1/2 flex flex-col gap-4 "
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-center m-6 font-bold text-gray-800">
              Iniciar Sesión
            </h1>
            {LoginFormArray.map(({ name, label, type, placeholder }) => {
              const formValue = LoginForm[name as keyof ILoginForm];
              const formError = LoginFormError[name as keyof ILoginForm];

              return (
                <React.Fragment key={name}>
                  <div className="mb-4 flex flex-col gap-4">
                    <label className="text-gray-700 text-2xl" htmlFor={name}>
                      {label}
                    </label>
                    <div className="flex justify-center items-center gap-2 bg-custom-white border-2 rounded-lg">
                      <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className="py-4 focus:outline-none rounded-2xl w-full px-4 bg-custom-white"
                        onChange={handleChange}
                        value={formValue}
                      />
                    </div>
                    <p className="text-red-500 text-sm mt-1 px-2">
                      {formError}
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
            <button
              className="Button_Form font-bold hover:bg-lime-600 text-white text-xl py-2 rounded-2xl mt-4 shadow-lg hover:shadow-xl transition duration-500 ease-in-out w-full"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
