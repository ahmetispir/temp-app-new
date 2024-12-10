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

// CRUD ve Login Endpoint'leri
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const adminUser = { username: "admin", password: "123456" };
  if (username === adminUser.username && password === adminUser.password) {
    res.json({ message: "Giriş başarılı!", token: "mock-jwt-token" });
  } else {
    res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı!" });
  }
});

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

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Dosya yüklenemedi!" });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});

// Kök Endpoint
router.get("/", (req, res) => {
  res.json({ message: "Backend çalışıyor!" });
});

app.use("/api", router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server çalışıyor: http://localhost:${PORT}`));
