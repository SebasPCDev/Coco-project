import ButtonClient from "../buttons";
import PromotionalComponent from "../mainAdvertisement";

const home = () => {
  return (
    <div>
      <PromotionalComponent />
      <div className="flex flex-row gap-4 justify-center py-8">
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
    </div>
  );
};
export default home;
