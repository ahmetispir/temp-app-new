
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
