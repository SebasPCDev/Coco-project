"use client";
import { LoginFormArray } from "../../../utils/arraysforms/loginForm";
import { useEffect, useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [LoginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [LoginFormError, setLoginFormError] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...LoginFormError, [name]: value });
  };

  return (
    <>
      <form className="md:w-1/3 m-auto px-2 md:my-20 ">
        <h1 className="text-3xl text-center">LOGIN</h1>
        {LoginFormArray.map(
          ({ name, label, type, placeholder, required, icon }) => {
            return (
              <div key={name} className="flex flex-col ">
                <label className="flex gap-4 px-2" htmlFor={name}>
                  {icon}
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={required}
                  className="border-2 mx-1/3 py-2"
                  onChange={handleChange}
                  value={LoginForm[name as keyof LoginForm]}
                />
                <p className="text-red-500">
                  {/* {LoginFormError[name as keyof LoginFormError]} */}
                </p>
              </div>
            );
          }
        )}
        <button
          className="bg-slate-500 text-white p-2 rounded-lg my-4"
          type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
