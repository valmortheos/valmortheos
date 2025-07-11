# Portofolio Valmortheos

Selamat datang di kode sumber untuk website portofolio Valmortheos. Website ini dirancang untuk menjadi modern, bersih, dengan fungsionalitas mode terang/gelap, dan placeholder untuk integrasi elemen 3D.

## Fitur Utama

- **Desain Modern & Minimalis**: Tata letak yang fokus pada keterbacaan dan estetika visual, dengan dominasi warna putih (mode terang) dan hitam (mode gelap), serta aksen warna biru elektrik.
- **Mode Terang & Gelap**: Pengguna dapat beralih antara mode terang dan gelap. Preferensi disimpan di `localStorage` dan tema sistem juga dapat dideteksi sebagai default awal.
- **Responsif**: Didesain agar terlihat baik di berbagai ukuran layar, mulai dari desktop hingga perangkat mobile.
- **Animasi SVG Scroll**: Efek visual 'cacing gambar' (path SVG) di bagian hero yang beranimasi (digambar) saat pengguna melakukan scroll.
- **Smooth Scrolling**: Navigasi yang mulus antar bagian halaman.
- **Navigasi Aktif**: Link navigasi secara otomatis menyorot bagian yang sedang dilihat.

## Struktur File

```
.
├── index.html       // File HTML utama untuk struktur portofolio
├── style.css        // File CSS untuk styling
├── script.js        // File JavaScript untuk fungsionalitas (mode tema, dll.)
└── README.md        // File ini
```

## Menjalankan Secara Lokal

1.  Clone repositori ini (jika ini adalah repositori Git).
2.  Buka file `index.html` langsung di browser web Anda.

Tidak ada langkah build atau dependensi server yang diperlukan untuk versi dasar ini.

## Kustomisasi

### 1. Mengubah Konten Teks

-   **Informasi Pribadi**: Edit `index.html` untuk mengubah teks di bagian "Tentang Saya", judul proyek, deskripsi proyek, dan informasi kontak.
-   **Nama Portofolio**: Ubah "Valmortheos" di `index.html` (dalam `<div class="logo">` dan `<title>`) sesuai keinginan.

### 2. Mengganti Proyek

-   Di dalam `index.html`, bagian `<section id="projects">`, Anda akan menemukan `<div class="project-item">`. Duplikat atau modifikasi blok ini untuk setiap proyek Anda.
-   Ubah `<h3>Nama Proyek</h3>`, `<p>Deskripsi singkat proyek.</p>`, dan tautan `href="#"`.

### 3. Mode Terang/Gelap

-   Warna untuk mode terang dan gelap telah diperbarui untuk tampilan yang lebih minimalis. Dominasi warna putih/abu-abu sangat terang untuk mode terang, dan hitam/abu-abu sangat gelap untuk mode gelap. Warna aksen utama adalah biru elektrik.
-   Variabel warna didefinisikan di bagian atas `style.css` dalam blok `:root {}`.
    ```css
    /* Variabel Warna (Contoh) */
    :root {
        /* Mode Terang */
        --bg-color-light: #ffffff;
        --text-color-light: #121212;
        --accent-color-light: #007BFF;
        /* ... variabel lainnya ... */

        /* Mode Gelap */
        --bg-color-dark: #121212;
        --text-color-dark: #f5f5f5;
        --accent-color-dark: #00BFFF;
        /* ... variabel lainnya ... */
    }
    ```
-   Anda dapat mengubah nilai-nilai hex warna ini di dalam `:root` untuk menyesuaikan palet warna.

### 4. Animasi SVG 'Cacing' pada Scroll

Efek visual 'cacing gambar' diimplementasikan menggunakan SVG path animation yang dikontrol oleh JavaScript berdasarkan posisi scroll pengguna.

-   **HTML**: Sebuah elemen `<svg id="scroll-worm">` dengan sebuah `<path id="worm-path">... </path></svg>` ditempatkan di dalam `div.hero-3d-placeholder` pada `index.html`.
    ```html
    <div class="hero-3d-placeholder">
        <svg id="scroll-worm" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <path id="worm-path" d="M10,10 C20,20 40,20 50,10 S70,0 80,10 S100,20 90,50 S70,80 50,90 S20,100 10,90 S0,70 10,50 S30,20 20,10 Z" fill="none" stroke-width="2"/>
        </svg>
    </div>
    ```
-   **CSS**: Styling untuk `#scroll-worm` dan `#worm-path` ada di `style.css`. Ini mengatur bagaimana path SVG digambar (menggunakan `stroke-dasharray` dan `stroke-dashoffset`).
    ```css
    #worm-path {
        stroke: var(--accent-color-light); /* Warna garis mengikuti tema */
        stroke-dasharray: 1000; /* Akan diupdate oleh JS */
        stroke-dashoffset: 1000; /* Akan diupdate oleh JS */
        transition: stroke-dashoffset 0.1s linear, stroke 0.3s ease;
    }

    body.dark-mode #worm-path {
        stroke: var(--accent-color-dark);
    }
    ```
-   **JavaScript**: Logika di `script.js` menangani:
    -   Menghitung panjang aktual dari `#worm-path`.
    -   Menginisialisasi `stroke-dasharray` dan `stroke-dashoffset` agar path tidak terlihat.
    -   Mendengarkan event scroll window.
    -   Memperbarui `stroke-dashoffset` berdasarkan seberapa jauh pengguna telah scroll di dalam `hero-section`, sehingga path tampak tergambar.

**Kustomisasi Animasi SVG**:
-   **Bentuk Path**: Anda dapat mengubah atribut `d` pada elemen `<path id="worm-path">` di `index.html` untuk membuat bentuk 'cacing' yang berbeda. Anda bisa menggunakan editor grafis vektor (seperti Inkscape atau Adobe Illustrator) untuk membuat path SVG kustom dan menyalin data path-nya.
-   **Kecepatan Animasi**: Dalam `script.js`, pada fungsi `animateWormOnScroll`, baris `let drawLength = pathLength * scrollPercentage * 2;` mengontrol seberapa cepat path digambar. Angka `* 2` membuat animasi dua kali lebih cepat dari persentase scroll. Anda bisa menyesuaikan pengali ini.
-   **Warna dan Ketebalan Garis**: Ubah properti `stroke` pada `#worm-path` di `style.css` (atau variabel aksen yang digunakannya) dan `stroke-width` pada elemen `<path>` di `index.html`.

Jika Anda ingin kembali ke placeholder 3D yang lebih generik atau menggunakan library seperti Three.js, Anda dapat menghapus atau mengomentari elemen `<svg id="scroll-worm">` dari `index.html` dan kode JavaScript terkait dari `script.js`, lalu mengikuti panduan integrasi Three.js atau Sketchfab dari versi README sebelumnya (jika masih relevan).

### 5. Formulir Kontak

Formulir kontak di `index.html` saat ini hanya memiliki placeholder JavaScript yang menampilkan `alert`. Untuk fungsionalitas pengiriman email yang sebenarnya, Anda perlu:
-   Menggunakan layanan pihak ketiga seperti [Formspree](https://formspree.io/), [Netlify Forms](https://www.netlify.com/products/forms/), atau [Web3Forms](https://web3forms.com/). Layanan ini biasanya memberikan endpoint URL yang bisa Anda gunakan di atribut `action` pada tag `<form>`.
-   Membuat backend sendiri (misalnya dengan Node.js, Python/Flask, PHP) untuk menangani data formulir dan mengirim email.

Contoh menggunakan Formspree:
1.  Buat akun di Formspree dan buat formulir baru untuk mendapatkan endpoint URL.
2.  Ubah tag `<form>` di `index.html`:
    ```html
    <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <label for="name">Nama:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required> <!-- Pastikan name="email" untuk balasan Formspree -->

        <label for="message">Pesan:</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Kirim Pesan</button>
    </form>
    ```
    Dengan ini, Anda mungkin tidak memerlukan JavaScript khusus untuk submit form lagi, karena browser akan menanganinya. Hapus atau sesuaikan event listener submit di `script.js` jika menggunakan metode ini.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini (misalnya, jika ini adalah proyek open source), silakan fork repositori dan buat pull request.

---
*Dibuat oleh Jules (AI Agent)*
