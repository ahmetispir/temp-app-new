// import React from 'react';

// const Hero = () => {
//   return (
//     <div className="bg-cover bg-center h-[600px] text-white relative flex items-center" style={{ backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/00/88/01/56/1000_F_88015643_oM3IvwKJq6SSXTIhG6BAUoifUCqAA1Lo.jpg')" }}>
//       {/* Sol Metin Alanı */}
//       <div className="container mx-auto px-6 md:px-12 lg:w-1/2">
//         <h1 className="text-5xl font-extrabold mb-6">Material Kit 2 React</h1>
//         <p className="text-lg mb-8">
//           Start the Development with a ReactJS Material Design.
//         </p>
//         <button className="px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
//           Learn More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";

const Hero = () => {
  return (
    <div
      className="bg-hero-pattern bg-cover bg-center h-[500px] flex items-center justify-center relative"
      style={{
        backgroundImage: "url('url('https://as1.ftcdn.net/v2/jpg/00/88/01/56/1000_F_88015643_oM3IvwKJq6SSXTIhG6BAUoifUCqAA1Lo.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-80"></div>
      <div className="text-center text-white relative z-10">
        <h1 className="text-5xl font-bold">Daha İyisini Başarmak İçin</h1>
        <p className="mt-4 text-lg">
          Bizimle birlikte projelerinizi daha ileriye taşıyın.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg">
          Daha Fazla Bilgi
        </button>
      </div>
    </div>
  );
};

export default Hero;
