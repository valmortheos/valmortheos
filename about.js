// About Page Specific JavaScript - Valmortheos Portfolio

document.addEventListener('DOMContentLoaded', () => {
    console.log("About page JS loaded.");

    // Animasi sederhana untuk elemen di halaman "Tentang" saat scroll
    const sections = document.querySelectorAll('.about-section');

    if (sections.length > 0) {
        const animateOnScroll = () => {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                // Muncul saat bagian atas section masuk sekitar 85% dari tinggi viewport
                if (sectionTop < windowHeight * 0.85) {
                    section.style.opacity = "1";
                    section.style.transform = "translateY(0)";
                }
                // Opsional: sembunyikan lagi jika scroll ke atas (jika diinginkan)
                // else if (sectionTop > windowHeight) {
                //     section.style.opacity = "0";
                //     section.style.transform = "translateY(30px)";
                // }
            });
        };

        // Inisialisasi style awal untuk animasi
        sections.forEach(section => {
            section.style.opacity = "0";
            section.style.transform = "translateY(30px)";
            section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        });

        // Panggil fungsi saat load dan scroll
        animateOnScroll(); // Panggil sekali saat load untuk elemen yang sudah terlihat
        window.addEventListener('scroll', animateOnScroll);
    }

    // Interaksi pada skill tags tidak lagi diperlukan di JS karena CSS sudah menangani hover.
    // const skillTags = document.querySelectorAll('.skill-tag');
    // skillTags.forEach(tag => {
    //     tag.addEventListener('mouseenter', () => {
    //         // Efek hover ditangani oleh CSS
    //     });
    //     tag.addEventListener('mouseleave', () => {
    //         // Efek hover ditangani oleh CSS
    //     });
    // });
});
