// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Hakkimizda from "./components/Hakkimizda";
// import Cards from "./components/Cards";
// import AdminLogin from "./pages/AdminLogin";
// import AdminPanel from "./pages/AdminPanel";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Hero from "./components/Hero";
// import Referanslar from "./components/Referanslar";
// import NelerYapiyoruz from "./components/NelerYapiyoruz";
// import HomeReferences from "./components/HomeReferences"; // HomeReferences import edildi


// const App = () => {
//   const [references, setReferences] = useState([]);

//   useEffect(() => {
//     // Backend'den referansları çekiyoruz
//     fetch("http://localhost:5001/list?type=references")
//       .then((res) => res.json())
//       .then((data) => setReferences(data || []))
//       .catch((err) => console.error("Veri alınamadı:", err));
//   }, []);

//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <Routes>
//           {/* Ana sayfa */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Hero />
//                 <section className="bg-gray-50 py-8">
//                   <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                     Referanslarımız
//                   </h2>
//                   <HomeReferences references={references} />
//                 </section>
//               </>
//             }
//           />
//           <Route path="/about" element={<Hakkimizda />} />
//           <Route path="/references" element={<Referanslar />} />
//           <Route path="/works" element={<NelerYapiyoruz />} />
//           <Route path="/login" element={<AdminLogin />} />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <AdminPanel />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hakkimizda from "./components/Hakkimizda";
import Cards from "./components/Cards";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Hero from "./components/Hero";
import Referanslar from "./components/Referanslar";
import NelerYapiyoruz from "./components/NelerYapiyoruz";
import HomeReferences from "./components/HomeReferences"; // HomeReferences import edildi
import config from "./config"; // Dinamik BASE_URL için

const App = () => {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    // Backend'den referansları çekiyoruz
    fetch(`${config.BASE_URL}/list?type=references`) // Dinamik BASE_URL kullanımı
      .then((res) => res.json())
      .then((data) => setReferences(data.slice(0, 4) || [])) // İlk 4 referansı al
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />
        <Routes>
          {/* Ana sayfa */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* Referanslar Bölümü */}
                <section className="bg-gray-50 py-8">
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Referanslarımız
                  </h2>
                  <HomeReferences references={references} />
                </section>
              </>
            }
          />
          <Route path="/about" element={<Hakkimizda />} />
          <Route path="/references" element={<Referanslar />} />
          <Route path="/works" element={<NelerYapiyoruz />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

