(function() {
    'use strict';

    const config = {
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        selectors: {
            loader: '#loader',
            loaderText: '.loader__text',
            cursor: '.cursor',
            cursorFollower: '.cursor-follower',
            linksAndButtons: 'a, button',
            magneticElements: 'button, .project-card__link',
            menuToggle: '.menu-toggle',
            navLinks: '.nav__links',
            header: '.header',
            navLinksAnchors: '.nav__links a[href^="#"]',
            backToTop: '.back-to-top',
            sectionTitles: '.section__title',
            heroTitle: '.hero__title',
            heroSubtitle: '.hero__subtitle',
            projectImages: '.project-card__image',
            sections: 'section',
            skillCards: '.skill-card',
            projectCards: '.project-card',
            testimonialCards: '.testimonial-card',
            threeContainer: '#three-container',
            tiltElements: '.project-card',
            toggleModeButton: '.toggle-mode',
            contactForm: '#contact .contact-form'
        },
        animation: {
            duration: 1.5,
            delay: 2,
            stagger: 0.05,
            ease: 'power3.out'
        },
        lenis: {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
        testimonialInterval: 5000
    };

    function initLenis() {
        const lenis = new Lenis(config.lenis);
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return lenis;
    }

    function initLoader() {
        const loaderText = document.querySelector(config.selectors.loaderText);
        if (loaderText) {
            const text = loaderText.textContent;
            loaderText.innerHTML = '';
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${i * 0.1}s`;
                loaderText.appendChild(span);
            });
        }

        const loader = document.querySelector(config.selectors.loader);
        if (loader) {
            gsap.to(loader, {
                duration: config.animation.duration,
                opacity: 0,
                zIndex: -1,
                delay: config.animation.delay,
                onComplete: () => {
                    document.body.style.overflowY = 'auto';
                }
            });
        }
    }

    function initCursor() {
        if (config.isMobile) return;

        const cursor = document.querySelector(config.selectors.cursor);
        const cursorFollower = document.querySelector(config.selectors.cursorFollower);
        const links = document.querySelectorAll(config.selectors.linksAndButtons);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY });
            gsap.to(cursorFollower, { duration: 0.8, x: e.clientX, y: e.clientY });
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 4 });
                cursor.classList.add('cursor--hover');
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1 });
                cursor.classList.remove('cursor--hover');
            });
        });
    }

    function initMagneticEffect() {
        if (config.isMobile) return;

        document.querySelectorAll(config.selectors.magneticElements).forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const { offsetX, offsetY, target } = e;
                const { clientWidth, clientHeight } = target;
                const x = (offsetX / clientWidth) - 0.5;
                const y = (offsetY / clientHeight) - 0.5;
                gsap.to(target, {
                    x: x * 20,
                    y: y * 20,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            });
        });
    }

    function initMobileMenu(lenis) {
        const menuToggle = document.querySelector(config.selectors.menuToggle);
        const navLinks = document.querySelector(config.selectors.navLinks);

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav__links--active');
            menuToggle.classList.toggle('menu-toggle--active');
        });

        document.querySelectorAll(config.selectors.navLinksAnchors).forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.classList.remove('nav__links--active');
                menuToggle.classList.remove('menu-toggle--active');
                lenis.scrollTo(this.getAttribute('href'));
            });
        });
    }

    function initHeaderScroll() {
        const header = document.querySelector(config.selectors.header);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }

    function initBackToTop(lenis) {
        const backToTopButton = document.querySelector(config.selectors.backToTop);
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('back-to-top--visible');
                } else {
                    backToTopButton.classList.remove('back-to-top--visible');
                }
            });
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                lenis.scrollTo('#hero');
            });
        }
    }

    function initGsapAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll(config.selectors.sectionTitles).forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'char';
                title.appendChild(span);
            });

            gsap.from(title.querySelectorAll('.char'), {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                y: '100%',
                stagger: config.animation.stagger,
                duration: 1,
                ease: config.animation.ease,
            });
        });

        gsap.from(config.selectors.heroTitle, { duration: 1, y: 100, opacity: 0, delay: 2.5, ease: config.animation.ease });
        gsap.from(config.selectors.heroSubtitle, { duration: 1, y: 100, opacity: 0, delay: 2.8, ease: config.animation.ease });

        gsap.utils.toArray(config.selectors.projectImages).forEach(image => {
            gsap.to(image, {
                scrollTrigger: {
                    trigger: image,
                    scrub: true,
                },
                y: -100,
                ease: 'none',
            });
        });

        document.querySelectorAll(config.selectors.sections).forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 100,
                duration: config.animation.duration,
                ease: config.animation.ease,
            });
        });

        gsap.from(config.selectors.skillCards, {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.2,
        });

        gsap.from(config.selectors.projectCards, {
            scrollTrigger: {
                trigger: '.project-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.2,
        });

        gsap.from('.timeline__item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
            },
            opacity: 0,
            y: 100,
            stagger: 0.3,
            duration: 1,
            ease: config.animation.ease,
        });

        gsap.from('.workflow-step', {
            scrollTrigger: {
                trigger: '.workflow-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.5,
        });

        gsap.from('.tech-card', {
            scrollTrigger: {
                trigger: '.tech-stack-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.5,
        });

        gsap.to('.timeline', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            },
            y: -100,
            ease: 'none',
        });
    }

    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll(config.selectors.testimonialCards);
        if (testimonials.length === 0) return;
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.remove('testimonial-card--active');
                if (i === index) {
                    testimonial.classList.add('testimonial-card--active');
                }
            });
        }
        showTestimonial(currentTestimonial)

        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, config.testimonialInterval);
    }

    function initThreeJs() {
        if (config.isMobile) return;

        const threeContainer = document.getElementById(config.selectors.threeContainer.replace('#', ''));
        if (!threeContainer) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        threeContainer.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.2,
            metalness: 0.8,
            flatShading: true,
        });
        const shape = new THREE.Mesh(geometry, material);
        window.threeShapeMaterial = material;
        scene.add(shape);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 3);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-5, -5, -5);
        scene.add(directionalLight);

        camera.position.z = 5;

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x007BFF,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        window.threeParticlesMaterial = particlesMaterial;
        scene.add(particlesMesh);

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            shape.rotation.x = scrollY * 0.001;
            shape.rotation.y = scrollY * 0.001;
            particlesMesh.rotation.y = -scrollY * 0.0005;
        });

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            shape.rotation.x += 0.001 * Math.sin(elapsedTime);
            shape.rotation.y += 0.001 * Math.cos(elapsedTime);

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function initTiltEffect() {
        if (config.isMobile) return;

        const tiltElements = document.querySelectorAll(config.selectors.tiltElements);
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = el.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                const rotateX = (y - 0.5) * -20;
                const rotateY = (x - 0.5) * 20;
                gsap.to(el, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    scale: 1.05,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            });
        });
    }

    function initDarkModeToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Mode';
        toggleButton.classList.add('toggle-mode');
        toggleButton.setAttribute('aria-label', 'Toggle dark/light mode');
        document.body.appendChild(toggleButton);

        const threeMaterial = window.threeShapeMaterial;
        const threeParticlesMaterial = window.threeParticlesMaterial;

        function applyTheme(isLight) {
            document.body.classList.toggle('light-mode', isLight);
            localStorage.setItem('mode', isLight ? 'light' : 'dark');
            if (threeMaterial) {
                threeMaterial.color.set(isLight ? 0x000000 : 0xffffff);
            }
            if (threeParticlesMaterial) {
                // Particle color remains blue in both modes
            }
        }

        const currentMode = localStorage.getItem('mode');
        applyTheme(currentMode === 'light');

        toggleButton.addEventListener('click', () => {
            applyTheme(!document.body.classList.contains('light-mode'));
        });
    }

    function initContactForm() {
        const form = document.querySelector(config.selectors.contactForm);
        if (!form) return;
        const submitButton = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    Toastify({ text: "Message sent successfully!", duration: 3000, style: { background: "linear-gradient(to right, #00b09b, #96c93d)" } }).showToast();
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                Toastify({ text: "Failed to send message. Please try again.", duration: 3000, style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" } }).showToast();
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const lenis = initLenis();
        initLoader();
        initCursor();
        initMagneticEffect();
        initMobileMenu(lenis);
        initHeaderScroll();
        initBackToTop(lenis);
        initGsapAnimations();
        initTestimonialSlider();
        initThreeJs();
        initTiltEffect();
        initDarkModeToggle();
        initContactForm();
    });

})();
