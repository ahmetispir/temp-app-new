
import React, { useEffect, useState } from "react";
import RefCards from "./RefCards"; // Kart bileşeni
import config from "../config"; // Dinamik backend URL

const Referanslar = () => {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    // Backend'den verileri çek
    fetch("https://temp-app-xi.vercel.app/api/list?type=references")
      .then((res) => res.json())
      .then((data) => setReferences(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Referanslarımız</h1>
      <div className="space-y-8">
        {/* Backend'den gelen referansları kart yapısında göster */}
        {references.map((ref, index) => (
          <RefCards
            key={ref._id}
            name={ref.name}
            info={ref.info}
            logo={ref.logo}
            reverse={index % 2 !== 0} // Sırayla ters yap
          />
        ))}
      </div>
    </div>
  );
};

export default Referanslar;
