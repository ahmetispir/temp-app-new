import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("about");

  // Hakkımızda
  const [about, setAbout] = useState({ text: "", image: "" });

  // Referanslar
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({
    name: "",
    logo: "",
    info: "",
    service: "",
  });

  // Neler Yapıyoruz
  const [works, setWorks] = useState([]);
  const [newWork, setNewWork] = useState({ title: "", description: "", image: "" });

  // Backend'den verileri çekme
  useEffect(() => {
    fetch("http://localhost:5001/list?type=about")
      .then((res) => res.json())
      .then((data) => setAbout(data[0] || { text: "", image: "" }));

    fetch("http://localhost:5001/list?type=references")
      .then((res) => res.json())
      .then((data) => setReferences(data));

    fetch("http://localhost:5001/list?type=works")
      .then((res) => res.json())
      .then((data) => setWorks(data));
  }, []);

  // Hakkımızda Güncelle
  const updateAbout = () => {
    fetch("http://localhost:5001/update/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    }).then((res) => res.json()).then((data) => alert(data.message));
  };

  // Referans Ekle
  const addReference = () => {
    fetch("http://localhost:5001/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "references", ...newReference }),
    }).then((res) => res.json()).then((data) => {
      alert(data.message);
      setReferences([...references, { ...newReference, id: data.id }]);
      setNewReference({ name: "", logo: "", info: "", service: "" });
    });
  };

  // İş Ekle
  const addWork = () => {
    fetch("http://localhost:5001/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "works", ...newWork }),
    }).then((res) => res.json()).then((data) => {
      alert(data.message);
      setWorks([...works, { ...newWork, id: data.id }]);
      setNewWork({ title: "", description: "", image: "" });
    });
  };

  // Referans veya İş Sil
  const deleteItem = (id, type) => {
    fetch(`http://localhost:5001/delete/${id}?type=${type}`, {
      method: "DELETE",
    }).then((res) => res.json()).then((data) => {
      alert(data.message);
      if (type === "references") {
        setReferences(references.filter((ref) => ref.id !== id));
      } else if (type === "works") {
        setWorks(works.filter((work) => work.id !== id));
      }
    });
  };

  // Görsel Yükleme
  const uploadFile = async (file, callback) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      callback(data.url);
    } catch (error) {
      alert("Dosya yüklenirken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg py-4 px-6 rounded-b-lg">
        <ul className="flex space-x-6 justify-center">
          <li>
            <button
              onClick={() => setActiveTab("about")}
              className={`${
                activeTab === "about" ? "text-yellow-300 underline" : "text-white"
              } font-semibold hover:text-yellow-300 transition`}
            >
              <i class="fa fa-info-circle" aria-hidden="true"></i> Hakkımızda
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("references")}
              className={`${
                activeTab === "references" ? "text-yellow-300 underline" : "text-white"
              } font-semibold hover:text-yellow-300 transition`}
            >
              <i className="fa fa-building mr-2"></i> Referanslar
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("works")}
              className={`${
                activeTab === "works" ? "text-yellow-300 underline" : "text-white"
              } font-semibold hover:text-yellow-300 transition`}
            >
              <i className="fa fa-tasks mr-2"></i> Neler Yapıyoruz
            </button>
          </li>
        </ul>
      </nav>


      {/* İçerik */}
      <div className="p-8">
        {activeTab === "about" && (
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Hakkımızda Yönetimi</h2>
            <textarea
              value={about.text}
              onChange={(e) => setAbout({ ...about, text: e.target.value })}
              className="w-full border rounded mb-4 p-2"
              placeholder="Hakkımızda metni"
            />
            <input
              type="file"
              onChange={(e) =>
                uploadFile(e.target.files[0], (url) =>
                  setAbout({ ...about, image: url })
                )
              }
              className="w-full border rounded mb-4 p-2"
            />
            <button
              onClick={updateAbout}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Güncelle
            </button>
          </section>
        )}

        {activeTab === "references" && (
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Referanslar Yönetimi</h2>
            {references.map((ref) => (
              <div key={ref.id} className="p-4 border rounded mb-4">
                <h3 className="font-bold">{ref.name}</h3>
                <p>{ref.info}</p>
                <p><strong>Hizmet:</strong> {ref.service}</p>
                <button
                  onClick={() => deleteItem(ref.id, "references")}
                  className="text-red-500 hover:underline"
                >
                  Sil
                </button>
              </div>
            ))}
            <h3 className="text-lg font-semibold mt-6">Yeni Referans Ekle</h3>
            <input
              type="text"
              value={newReference.name}
              onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
              placeholder="Firma İsmi"
              className="w-full border rounded mb-2 p-2"
            />
            <textarea
              value={newReference.info}
              onChange={(e) => setNewReference({ ...newReference, info: e.target.value })}
              placeholder="Firma Bilgisi"
              className="w-full border rounded mb-2 p-2"
            />
            <input
              type="file"
              onChange={(e) =>
                uploadFile(e.target.files[0], (url) =>
                  setNewReference({ ...newReference, logo: url })
                )
              }
              className="w-full border rounded mb-2 p-2"
            />
            <input
              type="text"
              value={newReference.service}
              onChange={(e) => setNewReference({ ...newReference, service: e.target.value })}
              placeholder="Hizmet"
              className="w-full border rounded mb-4 p-2"
            />
            <button
              onClick={addReference}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Ekle
            </button>
          </section>
        )}

        {activeTab === "works" && (
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Neler Yapıyoruz Yönetimi</h2>
            {works.map((work) => (
              <div key={work.id} className="p-4 border rounded mb-4">
                <h3 className="font-bold">{work.title}</h3>
                <p>{work.description}</p>
                <button
                  onClick={() => deleteItem(work.id, "works")}
                  className="text-red-500 hover:underline"
                >
                  Sil
                </button>
              </div>
            ))}
            <h3 className="text-lg font-semibold mt-6">Yeni İş Ekle</h3>
            <input
              type="text"
              value={newWork.title}
              onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
              placeholder="Başlık"
              className="w-full border rounded mb-2 p-2"
            />
            <textarea
              value={newWork.description}
              onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
              placeholder="Açıklama"
              className="w-full border rounded mb-2 p-2"
            />
            <input
              type="file"
              onChange={(e) =>
                uploadFile(e.target.files[0], (url) =>
                  setNewWork({ ...newWork, image: url })
                )
              }
              className="w-full border rounded mb-4 p-2"
            />
            <button
              onClick={addWork}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Ekle
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
