# Valmortheos — a.k.a Valmortheoz

Halaman profil pribadi — full static, siap deploy ke GitHub Pages.

## Cara deploy

1. Taruh file di root folder ini (jangan di-rename):
   - `foto.jpg` — avatar sisi depan
   - `foto2.jpg` — avatar sisi belakang (muncul saat coin flip)
   - `music.mp3` — musik background (opsional, tapi tanpa file ini tombol mute = silent)
2. Push semua file ke repo GitHub.
3. Buka **Settings → Pages → Source: Deploy from branch → main / root**.
4. Selesai. Halaman aktif di `https://<username>.github.io/<repo>/`.

## ⚠️ Soal autoplay musik

Browser modern (Chrome, Safari, Firefox) **memblokir autoplay audio** tanpa
interaksi user — ini kebijakan mereka, bukan bug. Yang dilakukan `script.js`:

1. Coba `audio.play()` begitu halaman dibuka.
2. Kalau ditolak → pasang listener sekali. Begitu user klik/tap/tekan tombol
   apa pun, musik langsung play.
3. Tombol bulat di pojok kanan bawah untuk mute/unmute manual.

Jadi: **musik akan otomatis play setelah user melakukan interaksi pertama**
(scroll, klik, tap — apa pun). Kalau mau benar-benar play tanpa interaksi
sama sekali, itu tidak mungkin di browser modern tanpa flag khusus.

## Struktur

- `index.html` — markup utama
- `style.css` — semua styling (Paper & Ink palette)
- `script.js` — auto coin flip, floating avatar, scroll reveal, music
- `foto.jpg` — avatar depan
- `foto2.jpg` — avatar belakang
- `music.mp3` — bgm (opsional)

## Timing yang bisa diubah

Di `script.js`:

- `FLIP_INTERVAL_MS = 2000` — jeda tiap muka coin (default 2 detik)
- `MANUAL_PAUSE_MS = 4000` — auto-flip pause setelah tap manual

## Catatan

- Semua ikon dari CDN (Devicon + Simple Icons).
- Fonts via Google Fonts (Manrope + Press Start 2P).
- Dark mode tidak disertakan — light theme by design.
