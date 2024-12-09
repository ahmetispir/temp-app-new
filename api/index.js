require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// Modelleri İçeri Aktarma
const About = require("./models/About");
const Reference = require("./models/Reference");
const Work = require("./models/Work");

const serverless = require("serverless-http"); // Vercel için gerekli adaptör

const app = express();
const router = express.Router();

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB'ye bağlanıldı!"))
.catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Middleware
// Middleware'ler
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer Ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Login Endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const adminUser = {
    username: "admin",
    password: "123456",
  };

  if (username === adminUser.username && password === adminUser.password) {
    res.json({ message: "Giriş başarılı!", token: "mock-jwt-token" });
  } else {
    res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı!" });
  }
});

// CRUD Endpoints
router.get("/list", async (req, res) => {
  try {
    const { type } = req.query;

    if (type === "about") {
      const about = await About.find();
      res.json(about);
    } else if (type === "references") {
      const references = await Reference.find();
      res.json(references);
    } else if (type === "works") {
      const works = await Work.find();
      res.json(works);
    } else {
      res.status(400).json({ message: "Geçersiz tip!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Veriler alınamadı!", err });
  }
});

router.put("/update/about", async (req, res) => {
  try {
    const { text, image } = req.body;
    const about = await About.findOneAndUpdate({}, { text, image }, { new: true, upsert: true });
    res.json({ message: "Hakkımızda başarıyla güncellendi!", about });
  } catch (err) {
    res.status(500).json({ message: "Güncelleme başarısız!", err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { type, ...data } = req.body;

    if (type === "about") {
      const about = new About(data);
      await about.save();
      res.json({ message: "Hakkımızda başarıyla eklendi!" });
    } else if (type === "references") {
      const reference = new Reference(data);
      await reference.save();
      res.json({ message: "Referans başarıyla eklendi!" });
    } else if (type === "works") {
      const work = new Work(data);
      await work.save();
      res.json({ message: "Yeni iş başarıyla eklendi!" });
    } else {
      res.status(400).json({ message: "Geçersiz veri türü!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Veri ekleme başarısız!", err });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;

    if (type === "references") {
      await Reference.findByIdAndDelete(id);
      res.json({ message: "Referans başarıyla silindi!" });
    } else if (type === "works") {
      await Work.findByIdAndDelete(id);
      res.json({ message: "İş başarıyla silindi!" });
    } else {
      res.status(400).json({ message: "Geçersiz tip!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Silme işlemi başarısız oldu!", err });
  }
});

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Dosya yüklenemedi!" });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});

// Kök Endpoint
// Örnek Route
router.get('/', (req, res) => {
  res.json({ message: 'Backend çalışıyor!' });
});

// Vercel için Serverless Adaptörü
app.use("/.netlify/functions/api", router); // Netlify örneği
module.exports = app;
module.exports.handler = serverless(app);
