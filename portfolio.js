// Portfolio Page Specific JavaScript - Valmortheos Portfolio

document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio page JS loaded.");

    // Data Proyek (Placeholder - idealnya ini datang dari CMS atau file JSON)
    const projects = [
        {
            id: 1,
            title: "Proyek Aplikasi Web Modern",
            category: "Web Development",
            image: "https://placehold.co/600x400/444444/FFFFFF?text=Proyek+1",
            description: "Pengembangan aplikasi web interaktif dengan teknologi terkini, fokus pada UX dan performa.",
            tags: ["React", "Node.js", "MongoDB", "UX Design"],
            link: "#" // Ganti dengan link ke proyek aktual atau halaman detail
        },
        {
            id: 2,
            title: "Desain UI/UX Mobile App",
            category: "UI/UX Design",
            image: "https://placehold.co/600x400/CCCCCC/444444?text=Proyek+2",
            description: "Perancangan antarmuka pengguna yang intuitif dan menarik untuk aplikasi mobile lintas platform.",
            tags: ["Figma", "Mobile UI", "Prototyping"],
            link: "#"
        },
        {
            id: 3,
            title: "Sistem Manajemen Konten Kustom",
            category: "Web Development",
            image: "https://placehold.co/600x400/444444/FFFFFF?text=Proyek+3",
            description: "Pembangunan CMS dari awal untuk kebutuhan spesifik klien, memberikan fleksibilitas penuh.",
            tags: ["PHP", "Laravel", "MySQL", "CMS"],
            link: "#"
        },
        {
            id: 4,
            title: "Branding dan Identitas Visual",
            category: "Branding",
            image: "https://placehold.co/600x400/CCCCCC/444444?text=Proyek+4",
            description: "Menciptakan identitas merek yang kuat dan kohesif, mulai dari logo hingga panduan gaya.",
            tags: ["Logo Design", "Brand Strategy", "Visual Identity"],
            link: "#"
        },
        {
            id: 5,
            title: "E-commerce Platform Terintegrasi",
            category: "Web Development",
            image: "https://placehold.co/600x400/444444/FFFFFF?text=Proyek+5",
            description: "Solusi e-commerce lengkap dengan integrasi pembayaran dan manajemen inventaris.",
            tags: ["Shopify", "WooCommerce", "Payment Gateway"],
            link: "#"
        },
        {
            id: 6,
            title: "Ilustrasi Digital Kreatif",
            category: "Graphic Design",
            image: "https://placehold.co/600x400/CCCCCC/444444?text=Proyek+6",
            description: "Pembuatan ilustrasi digital unik untuk berbagai keperluan, dari editorial hingga marketing.",
            tags: ["Adobe Illustrator", "Digital Painting", "Character Design"],
            link: "#"
        }
    ];

    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterContainer = document.querySelector('.portfolio-filter');

    // Fungsi untuk menampilkan proyek
    function displayProjects(projectList) {
        if (!portfolioGrid) return;
        portfolioGrid.innerHTML = ''; // Kosongkan grid sebelum mengisi

        if (projectList.length === 0) {
            portfolioGrid.innerHTML = '<p class="no-projects-message" style="text-align:center; grid-column: 1 / -1; color: var(--secondary-color);">Tidak ada proyek yang sesuai dengan filter ini.</p>';
            return;
        }

        projectList.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('portfolio-item');
            projectItem.setAttribute('data-category', project.category.toLowerCase().replace(/\s+/g, '-')); // untuk filtering

            let tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            projectItem.innerHTML = `
                <div class="portfolio-item-image-container">
                    <img src="${project.image}" alt="${project.title}" class="placeholder-img">
                    <div class="portfolio-item-overlay">
                        <a href="${project.link}" class="overlay-link" target="_blank" title="Lihat Proyek">
                            <i class="fas fa-eye"></i> <!-- Contoh ikon, perlu Font Awesome atau SVG -->
                        </a>
                    </div>
                </div>
                <div class="portfolio-item-content">
                    <h3>${project.title}</h3>
                    <p class="portfolio-item-category">${project.category}</p>
                    <p class="portfolio-item-description">${project.description}</p>
                    <div class="portfolio-item-tags">
                        ${tagsHTML}
                    </div>
                    <a href="${project.link}" class="portfolio-item-link" target="_blank">Detail Proyek</a>
                </div>
            `;
            portfolioGrid.appendChild(projectItem);
            // Tambahkan ikon mata sederhana jika FontAwesome tidak digunakan
            if (!window.FontAwesomeKitConfig) { // Cek kasar jika FA tidak ada
                const overlayLink = projectItem.querySelector('.overlay-link');
                if (overlayLink) overlayLink.innerHTML = '👁️';
            }
        });
    }

    // Fungsi untuk membuat tombol filter
    function setupFilters() {
        if (!filterContainer || projects.length === 0) return;

        const categories = ['Semua', ...new Set(projects.map(p => p.category))]; // Ambil kategori unik

        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('filter-btn');
            button.textContent = category;
            if (category === 'Semua') {
                button.classList.add('active');
            }
            button.setAttribute('data-filter', category.toLowerCase().replace(/\s+/g, '-'));
            filterContainer.appendChild(button);
        });

        // Event listener untuk tombol filter
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Hapus kelas active dari semua tombol
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Tambah kelas active ke tombol yang diklik
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                if (filterValue === 'semua') {
                    displayProjects(projects);
                } else {
                    const filteredProjects = projects.filter(project =>
                        project.category.toLowerCase().replace(/\s+/g, '-') === filterValue
                    );
                    displayProjects(filteredProjects);
                }
                // Re-apply animations or interactions if necessary
                addPortfolioItemHoverEffect();
            });
        });
    }

    // Fungsi untuk efek hover pada item portofolio (jika diperlukan lebih dari CSS)
    function addPortfolioItemHoverEffect() {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            // Contoh: bisa menambahkan class saat hover jika ingin trigger animasi JS kompleks
            item.addEventListener('mouseenter', () => {
                // item.classList.add('item-hovered');
            });
            item.addEventListener('mouseleave', () => {
                // item.classList.remove('item-hovered');
            });
        });
    }

    // Inisialisasi
    if (portfolioGrid) {
        displayProjects(projects); // Tampilkan semua proyek secara default
        setupFilters();
        addPortfolioItemHoverEffect();
    }

});
