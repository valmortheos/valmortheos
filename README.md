# Portofolio Valmortheos

Selamat datang di kode sumber untuk website portofolio Valmortheos. Website ini dirancang untuk menjadi modern, bersih, dengan fungsionalitas mode terang/gelap, dan placeholder untuk integrasi elemen 3D.

## Fitur Utama

- **Desain Modern & Bersih**: Tata letak yang fokus pada keterbacaan dan estetika visual.
- **Mode Terang & Gelap**: Pengguna dapat beralih antara mode terang dan gelap. Preferensi disimpan di `localStorage` dan tema sistem juga dapat dideteksi sebagai default awal.
- **Responsif**: Didesain agar terlihat baik di berbagai ukuran layar, mulai dari desktop hingga perangkat mobile.
- **Placeholder Elemen 3D**: Area yang telah ditentukan di bagian hero untuk menampilkan model atau animasi 3D.
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

-   Warna untuk mode terang dan gelap didefinisikan sebagai variabel CSS di bagian atas `style.css` di dalam blok `:root {}` dan aturan untuk `body.dark-mode`.
    ```css
    /* Variabel Warna Dasar (bisa dianggap default untuk light mode) */
    :root {
        --primary-color-light: #6a11cb;
        --secondary-color-light: #2575fc;
        --background-color-light: #f4f7f6;
        --text-color-light: #333;
        --card-bg-light: #ffffff;
        --border-color-light: #e0e0e0;

        /* Definisikan juga variabel dark mode di sini agar mudah dilihat */
        --primary-color-dark: #7f00ff;
        --secondary-color-dark: #00bfff;
        --background-color-dark: #1a1a2e;
        --text-color-dark: #e0e0e0;
        --card-bg-dark: #16213e;
        --border-color-dark: #0f3460;
    }

    /* Mode Terang (Default) */
    body.light-mode {
        background-color: var(--background-color-light);
        color: var(--text-color-light);
        /* ... dan seterusnya untuk properti spesifik light mode yang menggunakan variabel light ... */
    }

    /* Mode Gelap */
    body.dark-mode {
        background-color: var(--background-color-dark);
        color: var(--text-color-dark);
        /* ... dan seterusnya untuk properti spesifik dark mode yang menggunakan variabel dark ... */
    }
    ```
-   Anda dapat mengubah nilai-nilai hex warna ini di dalam `:root` untuk menyesuaikan palet warna kedua mode. CSS kemudian akan secara otomatis menerapkan warna yang benar berdasarkan kelas `light-mode` atau `dark-mode` pada elemen `<body>`.

### 4. Mengintegrasikan Elemen 3D

Placeholder untuk elemen 3D ada di `index.html` dalam `<section id="hero">`:
```html
<div class="hero-3d-placeholder">
    <p>Area untuk Elemen 3D</p>
</div>
```
Anda dapat mengganti konten `<div class="hero-3d-placeholder">` dengan implementasi 3D Anda. Berikut beberapa opsi:

-   **Menggunakan Library JavaScript (Contoh: Three.js)**:
    1.  Sertakan library Three.js di `index.html` (misalnya, melalui CDN).
    2.  Tulis skrip JavaScript untuk merender scene 3D Anda di dalam elemen `hero-3d-placeholder`. Anda mungkin perlu menyesuaikan ukuran dan styling elemen ini.
    3.  Contoh inisialisasi dasar Three.js:
        ```html
        <!-- Di dalam head atau sebelum </body> di index.html -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        ```
        ```javascript
        // Di script.js atau skrip terpisah
        const container = document.querySelector('.hero-3d-placeholder');
        if (container) {
            // Hapus teks placeholder jika ada
            container.innerHTML = ''; // Bersihkan placeholder

            const scene = new THREE.Scene();
            // Sesuaikan clientWidth dan clientHeight jika placeholder memiliki padding/border
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio); // Untuk tampilan lebih tajam di layar HiDPI
            container.appendChild(renderer.domElement);

            // Tambahkan objek 3D Anda di sini
            const geometry = new THREE.BoxGeometry(1, 1, 1); // Ukuran kubus
            const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x555555, shininess: 30 }); // Material dengan sedikit kilap
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Tambahkan pencahayaan
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0xffffff, 0.8);
            camera.add(pointLight); // Cahaya mengikuti kamera
            scene.add(camera); // Pastikan kamera ditambahkan ke scene jika cahaya adalah anaknya

            camera.position.z = 3; // Posisikan kamera

            function animate() {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.005;
                cube.rotation.y += 0.005;
                renderer.render(scene, camera);
            }
            animate();

            // Handle window resize
            window.addEventListener('resize', () => {
                const newWidth = container.offsetWidth;
                const newHeight = container.offsetHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }, false);
        }
        ```

-   **Menyematkan Model dari Platform (Contoh: Sketchfab)**:
    1.  Unggah model 3D Anda ke Sketchfab atau platform serupa.
    2.  Salin kode semat (biasanya iframe) yang disediakan.
    3.  Tempel kode iframe tersebut ke dalam `<div class="hero-3d-placeholder">`, menggantikan paragraf `<p>`. Pastikan untuk menyesuaikan atribut `width` dan `height` iframe jika diperlukan, atau atur styling CSS agar responsif.
        ```html
        <div class="hero-3d-placeholder">
            <iframe title="Judul Model Anda" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="100%" height="100%" src="URL_EMBED_SKETCHFAB_ANDA"></iframe>
        </div>
        ```
        Anda mungkin perlu menambahkan CSS untuk `.hero-3d-placeholder iframe` agar `width` dan `height` 100% bekerja dengan benar relatif terhadap kontainer `.hero-3d-placeholder`.

-   **Animasi CSS 3D**: Untuk efek 3D yang lebih sederhana, Anda dapat menggunakan transformasi dan animasi CSS 3D secara langsung pada elemen HTML di dalam placeholder.

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
