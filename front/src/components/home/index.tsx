import Image from "next/image";
import ButtonClient from "../buttons";
import PromotionalComponent from "../mainAdvertisement";
import Banner from "../Banner";
import { About } from "../About";
import Service from "../Service";
import Coworks from "../Cowoks";
const home = () => {
  return (
    <div>
      <section>
        <div style={{display: "flex", flexDirection: "row", marginInlineStart: "2rem", gap: "2rem", paddingBlock: "1rem"}}>
        <ButtonClient
          buttonText="Soy Coworking"
          path="coworkingsForm"
          color="secondary"
        />
        <ButtonClient
          buttonText="Soy Empresa"
          path="companiesForm"
          color="secondary"
        />
        </div>
        </section>
        <Banner/>
        <About/>
        <Service/>
        <Coworks/>
    </div>
  );
};
export default home;
