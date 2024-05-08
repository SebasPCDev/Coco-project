"use client";
import { LoginFormArray } from "../../../utils/arraysforms/loginForm";
import { useEffect, useState } from "react";
import ILoginForm from "../../../utils/types/loginFormInterface";
import PostLogin from "../../../utils/posts/postSignin";
import { useUserContext } from "../context";
import { log } from "console";

const LoginForm = () => {
  const { user, setuser, token, setToken } = useUserContext();
  const [LoginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const [LoginFormError, setLoginFormError] = useState<ILoginForm>({
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
      setuser(data.user);

      setToken(data.token);
    }
  };

  return (
    <>
      <form className="md:w-1/3 m-auto px-2 md:my-20 " onSubmit={handleSubmit}>
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
                  value={LoginForm[name as keyof ILoginForm]}
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
