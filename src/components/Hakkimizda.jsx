import React, { useEffect, useState } from "react";
import config from "../config";

const Hakkimizda = () => {
  const [about, setAbout] = useState({ text: "", image: "" });

  useEffect(() => {
    // fetch("http://localhost:5001/list?type=about")
    //   .then((res) => res.json())
    //   .then((data) => setAbout(data[0] || { text: "", image: "" }));
    fetch(`${config.BASE_URL}/list?type=about`)
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <div className="flex-grow container mx-auto px-4 py-8 bg-gray-50">
      {/* Yazı */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hakkımızda</h1>
        <p className="text-lg text-gray-700">{about.text}</p>
      </div>

      {/* Görsel */}
      {about.image && (
        <div className="flex justify-center">
          <img
            src={about.image}
            alt="Hakkımızda Görseli"
            className="w-1/2 h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Hakkimizda;
