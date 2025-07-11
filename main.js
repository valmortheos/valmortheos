// Main JavaScript - Valmortheos Portfolio

// Main JavaScript - Valmortheos Portfolio

// Fungsi untuk Navigasi Mobile (Burger Menu) - Disederhanakan
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active'); // CSS akan menangani animasi link melalui kelas ini
            burger.classList.toggle('toggle');   // CSS akan menangani animasi burger
        });
    }
}

// Fungsi untuk menandai link navigasi yang aktif - Ditingkatkan
const setActiveNavLink = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    // Menggunakan pathname untuk mendapatkan path relatif dari root, misal "/about.html" atau "/portfolio/page.html"
    // Kemudian kita hanya ambil bagian terakhir (nama file) atau string kosong jika di root.
    let currentPath = window.location.pathname;
    // Normalisasi: jika path adalah "/" (root), anggap sebagai "index.html" untuk perbandingan
    if (currentPath === '/' || currentPath.endsWith('/index.html')) {
        currentPath = 'index.html';
    } else {
        // Ambil nama file dari path, misal "/about.html" -> "about.html"
        currentPath = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    }

    // Jika setelah pemrosesan currentPath menjadi string kosong (misalnya dari root tanpa index.html), set ke index.html
    if (currentPath === "") {
        currentPath = "index.html";
    }

    navLinks.forEach(link => {
        const linkAttribute = link.getAttribute('href');
        if (linkAttribute) {
            let linkPath = linkAttribute.split("/").pop(); // Ambil nama file dari href
            // Normalisasi linkPath: jika kosong atau "index.html", anggap "index.html"
            if (linkPath === "" || linkPath === "index.html") {
                linkPath = "index.html";
            }

            link.classList.remove('active'); // Hapus dulu kelas active
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        }
    });
};


// Fungsi untuk efek Glassmorphism dinamis saat scroll (opsional, bisa membebani performa)
// const dynamicGlassHeader = () => { /* ... implementasi sebelumnya ... */ };

// Fungsi untuk animasi scroll halus ke elemen (jika menggunakan link internal #) - Ditingkatkan
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Pastikan href bukan hanya '#' dan merupakan selector ID yang valid
            // Selector ID yang valid dimulai dengan # diikuti oleh karakter (tidak boleh hanya angka setelah #).
            if (hrefAttribute && hrefAttribute.length > 1 && hrefAttribute.startsWith('#') && !hrefAttribute.includes(' ') && isNaN(parseInt(hrefAttribute.substring(1)))) {
                try {
                    // Cek apakah elemen ada di halaman saat ini
                    const targetElement = document.getElementById(hrefAttribute.substring(1));
                    if (targetElement) {
                        e.preventDefault(); // Hanya preventDefault jika target valid dan ada di halaman ini
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    // Jika targetElement tidak ditemukan di halaman ini, biarkan default behavior (mungkin link ke halaman lain dengan hash)
                } catch (error) {
                    // Abaikan jika selector tidak valid atau ada masalah lain
                    console.warn(`Error during smooth scroll for selector: ${hrefAttribute}`, error);
                }
            }
            // Jika hrefAttribute adalah "#" atau tidak valid, biarkan default behavior.
        });
    });
};

// Fungsi untuk parallax effect sederhana (opsional)
// const simpleParallax = (selector, speed) => { /* ... implementasi sebelumnya ... */ };


// Inisialisasi semua fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    setActiveNavLink();
    // dynamicGlassHeader(); // Aktifkan jika ingin efek header dinamis
    smoothScroll();

    console.log("Valmortheos Portfolio JS Loaded Successfully!");

    // Placeholder untuk interaksi spesifik halaman index.html
    if (document.querySelector('.hero')) {
        console.log("Index page specific JS can run here.");
        const ctaButton = document.querySelector('.hero .cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseover', () => {
                // Efek hover tambahan jika diperlukan (saat ini CSS sudah cukup)
            });
        }
    }
});

// Tidak perlu lagi blok kode untuk menambahkan keyframes navLinkFade secara dinamis.
// Animasi link di menu mobile dan animasi burger sudah dihandle oleh CSS.
