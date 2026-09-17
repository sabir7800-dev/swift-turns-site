const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

const tiltEls = document.querySelectorAll('.tilt-card');

const handleTilt = (card, event) => {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 12;
  const rotateX = (0.5 - (y / rect.height)) * 12;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
};

const resetTilt = (card) => {
  card.style.transform = '';
};

tiltEls.forEach((card) => {
  if (prefersReducedMotion) return;

  card.addEventListener('pointermove', (event) => handleTilt(card, event));
  card.addEventListener('pointerleave', () => resetTilt(card));
});
