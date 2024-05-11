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
      <form
        className="md:w-1/2 lg:w-1/3 m-auto px-4 py-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl text-center mb-6 font-bold text-gray-800">
          Iniciar Sesión
        </h1>
        {LoginFormArray.map(
          ({ name, label, type, placeholder, required, icon }) => {
            const formValue = LoginForm[name as keyof ILoginForm];
            const formError = LoginFormError[name as keyof ILoginForm];

            return (
              <React.Fragment key={name}>
                <div className="mb-4">
                  <label className="text-gray-700" htmlFor={name}>
                    {label}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {icon}
                    </div>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      required={required}
                      className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
        <button
          className="w-full bg-lime-400 text-white py-2 rounded-md hover:bg-lime-500 focus:outline-none focus:hover:bg-lime-600"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </>
  );
};

export default LoginForm;
