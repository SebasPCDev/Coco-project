"use client";
import { LoginFormArray } from "../../../utils/arraysforms/loginForm";
import React, { useEffect, useState } from "react";
import ILoginForm from "../../../utils/types/loginFormInterface";
import PostLogin from "../../../utils/posts/postSignin";
import { useUserContext } from "../context";
import { useRouter } from "next/navigation";
import ILoginErrorForm from "../../../utils/types/loginFormErrorInterface";
import loginValidation from "../../../utils/formValidation/loginValidation";
import redirectionByRole from "../../../utils/ redirects/redirectByRole";

const LoginForm = () => {
  const router = useRouter();

  const { user, setUser, token, setToken } = useUserContext();
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
    console.log(LoginForm);
    const data = await PostLogin(LoginForm);

    if (data) {
      setUser(data.user);
      setToken(data.token);
      if (data.user) {
        const redirection = redirectionByRole(data.user.role);

        router.push(redirection);
      }
    }
  };

  useEffect(() => {
    const errors = loginValidation(LoginForm);
    setLoginFormError(errors);
    console.log(errors);
  }, [LoginForm]);

  return (
    <>
      <div className="bg-[url('../../public/LoginMobile.png')] md:bg-[url('../../public/FondoLoginCoco1.png')] h-screen bg-cover bg-center relative">
        <form
          className="lg:w-1/4 md:3/4 w-1/2 px-8 pt-6 pb-8 mb-4 bg-custom-white rounded-lg shadow-lg absolute top-0 left-0 transform translate-x-1/2 translate-y-1/2 flex flex-col gap-4 "
          onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-6 font-bold text-gray-800">
            Iniciar Sesión
          </h1>
          {LoginFormArray.map(
            ({ name, label, type, placeholder, required, icon }) => {
              const formValue = LoginForm[name as keyof ILoginForm];
              const formError = LoginFormError[name as keyof ILoginForm];

              return (
                <React.Fragment key={name}>
                  <div className="mb-4 flex flex-col gap-4">
                    <label className="text-gray-700 text-2xl" htmlFor={name}>
                      {label}
                    </label>
                    <div className="flex justify-center items-center gap-2 bg border-2 rounded-lg">
                      <div className="">{icon}</div>
                      <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        className="py-4 focus:outline-none"
                        onChange={handleChange}
                        value={formValue}
                      />
                    </div>
                    <p className="text-red-500 text-sm mt-1">{formError}</p>
                  </div>
                </React.Fragment>
              );
            }
          )}
          <button className="Button_Form" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
