import React from "react";

const HomeReferences = ({ references }) => {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {references.map((ref) => (
        <div
          key={ref._id}
          className="bg-white shadow-md rounded-lg flex justify-center items-center p-4"
        >
          <img
            src={ref.logo}
            alt={ref.name}
            className="h-16 w-16 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default HomeReferences;

