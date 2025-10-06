// --- LOADER SCRIPT ---
// Listens for the 'load' event, which fires after all resources (like images) are loaded.
window.addEventListener('load', () => {
    document.body.classList.add('loading');
    // Wait for the animation to complete before hiding the loader.
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    }, 3000); // Matches the CSS animation duration.
});

// --- DYNAMIC CONTENT SCRIPT ---
// Listens for the 'DOMContentLoaded' event, which fires once the initial HTML document has been completely loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // --- SCROLL ANIMATION FOR HOME SECTIONS ---
    const homeSections = document.querySelectorAll('.home-section');
    if (homeSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });

        homeSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- SKILLS BARS ANIMATION ---
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    if (skillProgressBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    // Animate the width based on the data attribute.
                    progressBar.style.width = progressBar.dataset.progress;
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // --- LANGUAGE SWITCHER ---
    const langSwitcher = document.getElementById('lang-switcher');
    // Get language from localStorage to persist choice across pages, default to 'en'.
    let currentLang = localStorage.getItem('language') || 'en';

    function setLanguage(lang) {
        const elementsToTranslate = document.querySelectorAll('[data-lang]');
        elementsToTranslate.forEach(el => {
            if (el.dataset.lang === lang) {
                el.style.display = ''; // Show elements for the selected language.
            } else {
                el.style.display = 'none'; // Hide elements for the other language.
            }
        });
        // Update button text and save the choice.
        langSwitcher.textContent = lang === 'en' ? 'ID' : 'EN';
        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    // Event listener for the language switch button.
    langSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'id' : 'en';
        setLanguage(newLang);
    });

    // Set the initial language when the page loads.
    setLanguage(currentLang);
});