import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";

const sections = [
  {
    title: "Para Empresas",
    items: ["Publicar Espacio", "Gestionar Reservas", "Planes Corporativos"],
  },
  {
    title: "Para Empleados",
    items: ["Buscar Espacios", "Reservar Espacios", "Mis Reservas"],
  },
  {
    title: "Sobre Nosotros",
    items: ["Quiénes Somos", "Contacto", "Términos y Condiciones"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

export { sections, items };
