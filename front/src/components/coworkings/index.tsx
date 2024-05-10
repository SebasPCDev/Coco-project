"use client";
// import React, { useState, useEffect } from "react";
// import GetCoworkings from "../../../utils/gets/getCoworkings";
// import CoworkingCard from "./coworkingCard";
// import IResponseCoworking from "../../../utils/types/coworkingsResponse";

// const Coworkings: React.FC = (): React.ReactElement => {
//   const [coworkings, setCoworkings] = useState<IResponseCoworking[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await GetCoworkings();
//         console.log(data);

//         setCoworkings(data);
//       } catch (error) {
//         console.error("Error fetching coworkings:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <h1 className="m-auto text-center my-6 text-3xl font-bold">
//         Listado de Coworkings
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-3/4 m-auto">
//         {coworkings.map((coworking: IResponseCoworking) => (
//           <div key={coworking.id}>
//             <CoworkingCard coworking={coworking} />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
// export default Coworkings;
