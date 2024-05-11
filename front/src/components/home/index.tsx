import Image from "next/image";
import ButtonClient from "../buttons";
import PromotionalComponent from "../mainAdvertisement";
import Banner from "../Banner";
import { About } from "../About";
import Service from "../Service";
import Coworks from "../Cowoks";
import Coworkings from "../coworkings";
const home = () => {
  return (
    <div className="mb-20">
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginInlineStart: "2rem",
            gap: "2rem",
            paddingBlock: "1rem",
          }}
        >
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
      <Banner />
      <About />
      <Service />
      <Coworks />
      <Coworkings />
    </div>
  );
};
export default home;
