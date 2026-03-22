const observer = new MutationObserver(() => {

  const titles = document.querySelectorAll('.what-title');

  titles.forEach(title => {

    if(title.querySelector("span")) return;

    const words = title.textContent.trim().split(" ");

    if(words.length >= 2){

      const firstTwo = words.slice(0,2).join(" ");
      const rest = words.slice(2).join(" ");

      title.innerHTML = `<span class="accent">${firstTwo}</span> ${rest}`;

    }

  });

});

observer.observe(document.body, { childList:true, subtree:true });




const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  preloader.classList.add('hide');

  setTimeout(() => {
    preloader.remove();
  }, 500);
};

/* 1. Когда DOM готов */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hidePreloader, 1500);
});

/* 2. Когда ВСЁ загрузилось (если загрузится) */
window.addEventListener('load', hidePreloader);