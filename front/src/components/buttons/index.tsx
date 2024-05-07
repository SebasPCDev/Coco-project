import Link from "next/link";

const ButtonClient = ({
  buttonText,
  path,
  color,
}: {
  buttonText: string;
  path: string;
  color?: string;
}) => {
  return (
    <Link
      href={`/${path}`}
      className={`md:w-40 w-1/4 py-4 flex justify-center rounded-md bg-custom-${color} text-white`}>
      <button>{buttonText}</button>
    </Link>
  );
};

export default ButtonClient;
