
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Dynamic content loading
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.dataset.target;
        if (!targetId) return;

        e.preventDefault();
        const url = this.getAttribute('href');
        const targetContainer = document.getElementById(targetId);

        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.querySelectorAll('.content-container').forEach(c => c.classList.remove('visible'));
                targetContainer.innerHTML = html;
                setTimeout(() => targetContainer.classList.add('visible'), 10);
            })
            .catch(error => console.error('Error loading page: ', error));
    });
});

// Intersection Observer for animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});
