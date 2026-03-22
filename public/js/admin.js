async function loadData() {
  const res = await fetch("/api/content");
  const data = await res.json();

  Object.keys(data).forEach(page => {
    Object.keys(data[page]).forEach(key => {
      Object.keys(data[page][key]).forEach(lang => {

        const input = document.querySelector(
          `[name="${page}_${key}_${lang}"]`
        );

        if (input) {
          input.value = data[page][key][lang];
        }
      });
    });
  });
}

document.getElementById("adminForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await fetch("/api/save", {
    method: "POST",
    body: new URLSearchParams(formData)
  });

  alert("Сохранено!");
});

loadData();