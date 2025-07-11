document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Fungsi untuk menerapkan tema berdasarkan preferensi yang tersimpan atau sistem
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Mode Terang';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.textContent = 'Mode Gelap';
        }
    }

    // Cek tema yang tersimpan di localStorage
    const savedTheme = localStorage.getItem('theme');
    // Cek preferensi sistem jika tidak ada tema yang tersimpan
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default ke mode terang
    }

    // Event listener untuk tombol toggle tema
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });

    // (Opsional) Dengarkan perubahan preferensi sistem
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Hanya jika pengguna belum secara manual memilih tema
            if (e.matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        }
    });

    // Navigasi smooth scroll (opsional, tapi bagus untuk SPA feel)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // (Opsional) Menandai link navigasi yang aktif berdasarkan scroll
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // -100 untuk offset header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // Placeholder untuk fungsionalitas form kontak jika diperlukan
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Di sini Anda bisa menambahkan logika untuk mengirim data form,
            // misalnya menggunakan Fetch API ke backend atau layanan seperti Formspree.
            alert('Pesan Anda telah "dikirim"! (Ini adalah placeholder)');
            contactForm.reset();
        });
    }

    // Animasi Cacing SVG saat Scroll
    const wormPath = document.getElementById('worm-path');
    if (wormPath) {
        const pathLength = wormPath.getTotalLength();

        // Inisialisasi path
        wormPath.style.strokeDasharray = pathLength;
        wormPath.style.strokeDashoffset = pathLength;

        const heroSection = document.getElementById('hero');

        function animateWormOnScroll() {
            if (!heroSection) return;

            const scrollPercentage = (window.scrollY / (heroSection.offsetHeight - window.innerHeight));
            let drawLength = pathLength * scrollPercentage * 2; // Kalikan 2 agar lebih cepat tergambar

            // Batasi drawLength agar tidak melebihi pathLength atau kurang dari 0
            drawLength = Math.max(0, Math.min(drawLength, pathLength));

            wormPath.style.strokeDashoffset = pathLength - drawLength;

            // (Opsional) Efek tambahan, misalnya mengubah ketebalan stroke atau warna saat scroll
            // const newStrokeWidth = 2 + (scrollPercentage * 3);
            // wormPath.style.strokeWidth = Math.min(newStrokeWidth, 5);
        }

        // Panggil sekali di awal untuk set posisi jika sudah di-scroll
        animateWormOnScroll();

        window.addEventListener('scroll', () => {
            // Hanya animasikan jika hero section terlihat atau hampir terlihat
            // Ini adalah optimasi sederhana
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                animateWormOnScroll();
            }
        });
    }
});
