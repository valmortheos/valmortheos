/* ── 1. Letter-by-letter reveal ────────────────────── */
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

/* ── 2. Auto coin flip + manual toggle ─────────────── */
(function coinFlip() {
  const coin = document.querySelector('.coin');
  if (!coin) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FLIP_INTERVAL_MS = 2000;   // tiap muka tampil 2 detik
  const MANUAL_PAUSE_MS  = 4000;   // auto-flip pause 4 detik setelah tap manual

  let paused = false;
  let pauseTimer = null;

  function pauseAuto() {
    paused = true;
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(() => { paused = false; }, MANUAL_PAUSE_MS);
  }

  // Auto-flip: toggle tiap 2 detik (front 2s → back 2s → front 2s → ...)
  if (!prefersReduced) {
    setInterval(() => {
      if (paused) return;
      coin.classList.toggle('flipped');
    }, FLIP_INTERVAL_MS);
  }

  // Manual flip (klik / tap / keyboard) — semua device
  const manualFlip = () => {
    coin.classList.toggle('flipped');
    pauseAuto();
  };

  coin.addEventListener('click', manualFlip);

  coin.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      manualFlip();
    }
  });
})();

/* ── 3. Avatar floats when scrolled past hero ─────── */
(function coinFloatOnScroll() {
  const hero = document.querySelector('.hero');
  const coin = document.querySelector('.coin');
  if (!hero || !coin) return;

  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        coin.classList.add('coin--floating');
      } else {
        coin.classList.remove('coin--floating');
      }
    },
    { threshold: 0, rootMargin: '0px 0px -80px 0px' }
  );

  io.observe(hero);
})();

/* ── 4. Scroll reveal ──────────────────────────────── */
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

/* ── 5. Background music (autoplay + fallback) ────── */
(function backgroundMusic() {
  const audio = document.getElementById('bgm');
  const toggle = document.getElementById('music-toggle');
  if (!audio || !toggle) return;

  // Coba play langsung. Kalau browser blokir, tunggu interaksi pertama.
  function attemptAutoplay() {
    const promise = audio.play();
    if (promise && typeof promise.then === 'function') {
      promise
        .then(() => {
          toggle.classList.add('is-playing');
          toggle.setAttribute('aria-pressed', 'true');
          toggle.setAttribute('aria-label', 'Matikan musik');
        })
        .catch(() => {
          // Autoplay ditolak — pasang listener interaksi sekali saja
          const unlock = () => {
            audio.play().then(() => {
              toggle.classList.add('is-playing');
              toggle.setAttribute('aria-pressed', 'true');
              toggle.setAttribute('aria-label', 'Matikan musik');
            }).catch(() => {});
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
          };
          document.addEventListener('click', unlock, { once: true });
          document.addEventListener('touchstart', unlock, { once: true });
          document.addEventListener('keydown', unlock, { once: true });
        });
    }
  }

  attemptAutoplay();

  // Tombol mute/unmute
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();  // jangan trigger unlock listener lagi
    if (audio.paused) {
      audio.play()
        .then(() => {
          toggle.classList.add('is-playing');
          toggle.setAttribute('aria-pressed', 'true');
          toggle.setAttribute('aria-label', 'Matikan musik');
        })
        .catch(() => {});
    } else {
      audio.pause();
      toggle.classList.remove('is-playing');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', 'Aktifkan musik');
    }
  });
})();
