const list = document.querySelector('.gallery-list');
let cards = document.querySelectorAll('.gallery-card');

const btnLeft = document.querySelector('.left-scrol');
const btnRight = document.querySelector('.right-scrol');

const visibleCount = 3; // сколько элементов "в зоне видимости"

/* 🔥 клонируем несколько */
for (let i = 0; i < visibleCount; i++) {
  const firstClone = cards[i].cloneNode(true);
  const lastClone = cards[cards.length - 1 - i].cloneNode(true);

  list.appendChild(firstClone);
  list.prepend(lastClone);
}

/* обновляем */
cards = document.querySelectorAll('.gallery-card');

let index = visibleCount; // старт с реального первого

function updateSlider(animate = true) {
  const container = document.querySelector('.gallery-container');
  const card = cards[index];

  const containerWidth = container.offsetWidth;
  const cardCenter = card.offsetLeft + card.offsetWidth / 2;
  const offset = cardCenter - containerWidth / 2;

  list.style.transition = animate ? 'transform 0.5s ease' : 'none';
  list.style.transform = `translateX(-${offset}px)`;

  cards.forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}

/* кнопки */
btnRight.addEventListener('click', () => {
  index++;
  updateSlider();
});

btnLeft.addEventListener('click', () => {
  index--;
  updateSlider();
});

/* 🔥 плавный бесконечный переход */
list.addEventListener('transitionend', () => {
  if (index >= cards.length - visibleCount) {
    index = visibleCount;
    updateSlider(false);
  }

  if (index < visibleCount) {
    index = cards.length - visibleCount * 2;
    updateSlider(false);
  }
});

/* старт */
window.addEventListener('load', () => {
  updateSlider(false);
});