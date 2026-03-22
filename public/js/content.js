async function loadContent(lang = "ru", page = "home") {
  const res = await fetch("/api/content");
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.getAttribute("data-key");

    if (
      data[page] &&
      data[page][key] &&
      data[page][key][lang]
    ) {
      element.textContent = data[page][key][lang];
    }
  });
}

const langSelect = document.getElementById("lang");
const langIcon = document.getElementById("langIcon");

if (langSelect) {
  langSelect.addEventListener("change", (e) => {
    const page = document.body.dataset.page;

    loadContent(e.target.value, page);

    langIcon.src = `./image/${e.target.value}.png`;
  });
}
const page = document.body.dataset.page || "home";
loadContent("ru", page);
document.getElementById("langIcon").src = "./image/ru.png";


