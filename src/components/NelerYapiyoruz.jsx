import React, { useEffect, useState } from "react";
import WorkCard from "./WorkCard"; // Kart bileşeni
import config from "../config"; // Dinamik backend URL

const NelerYapiyoruz = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    // Backend'den verileri çek
    fetch("/api/list?type=works")
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

