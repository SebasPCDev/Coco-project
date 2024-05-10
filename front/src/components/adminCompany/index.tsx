import Link from "next/link";
import ArrayAdminCompany from "../../../utils/arrayMenu/arrayAdminCompany";


const AdminCompany = () => {
  return (
    <>
      <div className=" grid grid-cols-1 md:w-3/4 md:grid-cols-2 my-8 mx-auto">
        {ArrayAdminCompany.map((item) => (
          <section className="flex flex-col gap-4 m-4" key={item.name}>
            <Link key={item.path} href={item.path}>
              <li className="text-custom-white bg-custom-secondary p-6 ">
                {item.name}
              </li>
            </Link>
          </section>
        ))}
      </div>
    </>
  );
};

export default AdminCompany;
