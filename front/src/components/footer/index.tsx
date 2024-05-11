import { sections, items } from "../../../utils/arraysFooter/arraysFooter";
const Footer = () => {
  return (
    <div className="w-full mt-24 bg-custom-secondary text-gray-300 py-y px-2">
      <div className="max-w-[1240px] md:mx-auto mx-4 grid grid-cols-2 md:grid-cols-5 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-gray-500 hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-2">
          <p className="font-bold uppercase">Suscríbete a nuestro boletín</p>
          <p className="py-4">
            Recibe las últimas noticias y actualizaciones de coworkings,
            directamente en tu bandeja de entrada cada semana.
          </p>
          <form className="flex flex-col sm:flex-row">
            <input
              className="w-full bg-custom-white p-2 mr-4 rounded-md mb-4"
              type="email"
              placeholder="Ingresa tu correo electrónico.."
            />
            <button className="p-2 mb-4">Suscribirse</button>
          </form>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">2024 Soy Henry. Todos los derechos reservados</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((x, index) => {
            return <x.icon key={index} className="hover:text-white" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
