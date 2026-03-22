const burger = document.getElementById('burger-btn');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-btn');

burger.addEventListener('click', () => {
  menu.classList.add('active');
  document.body.style.overflow = 'hidden'; // блок скролла
});

closeBtn.addEventListener('click', closeMenu);

menu.addEventListener('click', (e) => {
  if (e.target === menu) closeMenu();
});

function closeMenu() {
  menu.classList.remove('active');
  document.body.style.overflow = '';
}
const links = document.querySelectorAll('.mobile-menu a');

links.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});