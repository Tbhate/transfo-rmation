const texts = document.querySelectorAll('.text');

const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

texts.forEach(el => textObserver.observe(el));
