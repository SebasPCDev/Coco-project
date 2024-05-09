import Link from "next/link";
import arrayNav from "../../../../utils/arrayMenu/arrayMenuOrNav";

const HeaderLeft = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <img src="/CocoLogo.svg" alt="" className="w-24" />
      <ul className="md:flex flex-row gap-4 hidden ">
        {arrayNav.map((item) => (
          <Link key={item.path} href={item.path}>
            <li className=" text-custom-white">{item.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HeaderLeft;
