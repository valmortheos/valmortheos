/* ── Letter-by-letter reveal for the name ─────────── */
(function splitName() {
  const el = document.querySelector('.name');
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = '';

  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch;
    span.style.animationDelay = `${i * 45}ms`;
    el.appendChild(span);
  });
})();

/* ── Coin flip: tap on touch devices only ─────────── */
(function coinFlip() {
  const coin = document.querySelector('.coin');
  if (!coin) return;

  const isTouch = window.matchMedia('(hover: none)').matches;

  if (isTouch) {
    coin.addEventListener('click', () => coin.classList.toggle('flipped'));
  }

  // Keyboard accessibility (always active)
  coin.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      coin.classList.toggle('flipped');
    }
  });
})();

/* ── Scroll reveal ────────────────────────────────── */
(function scrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));
})();
