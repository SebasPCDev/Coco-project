import ButtonClient from "../buttons";

const home = () => {
  return (
    <div className="flex flex-row gap-4 justify-center py-8">
      <ButtonClient buttonText="Soy Coworking" path="companiesForm" color="primary" />
      <ButtonClient buttonText="Soy Empresa" path="companiesForm" color="secondary"/>
    </div>
  );
};
export default home;
