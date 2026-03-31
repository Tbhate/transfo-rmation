const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// -------------------------------------------
app.get("/api/content", (req, res) => {
  const filePath = path.join(__dirname, "content.json");

  if (!fs.existsSync(filePath)) {
    return res.json({});
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(500).json({ error: "Ошибка чтения JSON" });
  }
});

// -------------------------------------------
app.post("/api/save", (req, res) => {
  const filePath = path.join(__dirname, "content.json");

  let content = {};
  if (fs.existsSync(filePath)) {
    try {
      content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
      content = {};
    }
  }

  Object.keys(req.body).forEach(field => {
    const parts = field.split("_"); // home_title_ru
    const page = parts[0];          // home / about
    const key = parts[1];           // title / description / text
    const lang = parts[2];          // ru / en / pl

    if (!content[page]) content[page] = {};
    if (!content[page][key]) content[page][key] = {};

    content[page][key][lang] = req.body[field];
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
    res.json({ message: "Сохранено" });
  } catch (e) {
    res.status(500).json({ error: "Ошибка записи JSON" });
  }
});

// -------------------------------------------
// Запуск сервера
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});