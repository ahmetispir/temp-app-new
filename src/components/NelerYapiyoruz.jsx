// import React, { useEffect, useState } from "react";
// import WorkCard from "../components/WorkCard";

// const NelerYapiyoruz = () => {
//   const [works, setWorks] = useState([]);

//   useEffect(() => {
//     // Backend'den "Neler Yapıyoruz" verilerini çekiyoruz
//     const fetchWorks = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/list?type=works");
//         if (!response.ok) {
//           throw new Error("Veri alınamadı!");
//         }
//         const data = await response.json();
//         setWorks(data || []);
//       } catch (error) {
//         console.error("Veri alınırken hata oluştu:", error);
//       }
//     };

//     fetchWorks();
//   }, []);

//   return (
//     <div className="flex-grow container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
//         Neler Yapıyoruz
//       </h1>
//       {works.length > 0 ? (
//         <WorkCard works={works} />
//       ) : (
//         <p className="text-center text-gray-500">Henüz veri bulunmuyor.</p>
//       )}
//     </div>
//   );
// };

// export default NelerYapiyoruz;

import React, { useEffect, useState } from "react";
import WorkCard from "./WorkCard"; // Kart bileşeni
import config from "../config"; // Dinamik backend URL

const NelerYapiyoruz = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    // Backend'den verileri çek
    fetch(`${config.BASE_URL}/list?type=works`)
      .then((res) => res.json())
      .then((data) => setWorks(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Neler Yapıyoruz</h1>
      <div className="space-y-8">
        {/* Backend'den gelen işleri kart yapısında göster */}
        {works.map((work, index) => (
          <WorkCard
            key={work._id}
            title={work.title}
            description={work.description}
            image={work.image}
            reverse={index % 2 !== 0} // Sırayla ters yap
          />
        ))}
      </div>
    </div>
  );
};

export default NelerYapiyoruz;

