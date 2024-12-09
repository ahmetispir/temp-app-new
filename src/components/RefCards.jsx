// import React from "react";

// const RefCards = ({ references }) => {
//   return (
//     <div className="flex flex-col gap-y-10">
//       {references.map((reference, index) => (
//         <div
//           key={reference.id}
//           className={`flex ${
//             index % 2 === 0 ? "flex-row" : "flex-row-reverse"
//           } items-center bg-white shadow-lg rounded-lg p-6`}
//           style={{ width: "75%", margin: "0 auto" }} // Kart genişliği %75 ve ortalanır
//         >
//           {/* Logo */}
//           <div className="w-1/4 flex justify-center items-center">
//             <img
//               src={reference.logo}
//               alt={reference.name}
//               className="w-32 h-32 object-cover rounded-full shadow-md"
//             />
//           </div>

//           {/* Yazılar */}
//           <div
//             className={`w-3/4 px-6 ${
//               index % 2 === 0 ? "text-right" : "text-left"
//             }`} // Yazı sola ya da sağa dayalı ve genişliği %75
//           >
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               {reference.name}
//             </h2>
//             <p className="text-gray-700">{reference.info}</p>
//             <p className="text-sm text-gray-500 mt-2">
//               <strong>Hizmet:</strong> {reference.service}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RefCards;
import React from "react";

const RefCards = ({ name, info, logo, reverse }) => {
  return (
    <div
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center bg-white shadow-md rounded-lg overflow-hidden`}
      style={{ width: "75%", margin: "0 auto" }}
    >
      {/* Logo */}
      <div className="w-1/3">
        <img src={logo} alt={name} className="object-cover w-full h-full" />
      </div>
      {/* İçerik */}
      <div className="w-2/3 p-6">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600">{info}</p>
      </div>
    </div>
  );
};

export default RefCards;
