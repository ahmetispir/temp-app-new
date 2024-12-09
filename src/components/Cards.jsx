import React, { useEffect, useState } from "react";

const Cards = ({ type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/list?type=${type}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [type]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {items.map((item) => (
      <div
        key={item.id}
        className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
      >
        <img
          src={item.logo || item.image}
          alt={item.name || item.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {item.name || item.title}
          </h2>
          <p className="text-gray-700">{item.info || item.description}</p>
          {item.service && (
            <p className="text-sm text-gray-500 mt-2">Hizmet: {item.service}</p>
          )}
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Cards;
