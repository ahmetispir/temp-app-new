// import React from "react";

// const WorkCard = ({ works }) => {
//   return (
//     <div className="flex flex-col gap-y-10">
//       {works.map((work, index) => (
//         <div
//           key={work.id}
//           className={`flex ${
//             index % 2 === 0 ? "flex-row" : "flex-row-reverse"
//           } items-center bg-white shadow-lg rounded-lg p-6`}
//           style={{ width: "75%", margin: "0 auto" }} // Kart genişliği %75 ve ortalanır
//         >
//           {/* Görsel */}
//           <div className="w-1/4 flex justify-center items-center">
//             <img
//               src={work.image}
//               alt={work.title}
//               className=" object-cover shadow-md"
//             />
//           </div>

//           {/* Yazılar */}
//           <div
//             className={`w-3/4 px-6 ${
//               index % 2 === 0 ? "text-right" : "text-left"
//             }`} // Yazı sola ya da sağa dayalı ve genişliği %75
//           >
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               {work.title}
//             </h2>
//             <p className="text-gray-700">{work.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WorkCard;
import React from "react";

const WorkCard = ({ title, description, image, reverse }) => {
  return (
    <div
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center bg-white shadow-md rounded-lg overflow-hidden`}
      style={{ width: "75%", margin: "0 auto" }}
    >
      {/* Görsel */}
      <div className="w-1/3">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      {/* İçerik */}
      <div className="w-2/3 p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default WorkCard;
