"use client";

import Image from "next/image";
import ButtonClient from "../buttons";
import PromotionalComponent from "../mainAdvertisement";
import Banner from "../Banner";
import { About } from "../About";
import Service from "../Service";
import Coworks from "../Cowoks";
import NavBarLanding from "../navBarLanding";
import DropdownMenu from "../sinUtilizar/dropdownMenu";
import { RiUserLine } from "@remixicon/react";
import HeaderMain from "../mainHeader";
import Link from "next/link";
const home = () => {
  return (
    <div>
      <nav className="bg-zinc-950 shadow font-sans">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="h-48 w-45" src="/LimaSinFondo.png" alt="Coco+" />
              <div className="hidden md:flex items-center space-x-12 ml-12">
                <NavBarLanding href="#Service">Cómo reservar</NavBarLanding>
                <NavBarLanding href="#Coworks">Nuestros espacios</NavBarLanding>
              </div>
            </div>
            <div>
              <Link href="/login">
                <button className="flex bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-10 rounded-full text-3xl">
                  <RiUserLine color="#ffffff" />
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Banner />
      <HeaderMain />
      {/* <About/> */}
      <Service id="Service" />
      <Coworks id="Coworks" />
    </div>
  );
};
export default home;
