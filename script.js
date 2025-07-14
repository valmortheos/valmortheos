// Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Loader animation
document.addEventListener("DOMContentLoaded", function() {
    const loaderText = document.querySelector('.loader-text');
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

    const loader = document.getElementById('loader');
    if (loader) {
        gsap.to(loader, {
            duration: 1.5,
            opacity: 0,
            zIndex: -1,
            delay: 2,
            onComplete: () => {
                document.body.style.overflowY = 'auto';
                if (typeof Vivus !== 'undefined') {
                    new Vivus('my-svg', {duration: 200});
                }
            }
        });
    }
});


// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY });
    gsap.to(cursorFollower, { duration: 0.8, x: e.clientX, y: e.clientY });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 4 });
        cursor.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1 });
        cursor.classList.remove('hover');
    });
});

// Magnetic effect on buttons
document.querySelectorAll('button, .project-card a').forEach(button => {
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

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        lenis.scrollTo(this.getAttribute('href'));
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo('#hero');
    });
}


// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Parallax scrolling for hero
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '#hero',
        scrub: true,
    },
    y: '-50%',
    ease: 'none',
});

// Text reveal animation for section titles
document.querySelectorAll('h2').forEach(title => {
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
        stagger: 0.05,
        duration: 1,
        ease: 'power3.out',
    });
});


// Hero animation
gsap.from('.hero-title', { duration: 1, y: 100, opacity: 0, delay: 2.5, ease: 'power3.out' });
gsap.from('.hero-content p', { duration: 1, y: 100, opacity: 0, delay: 2.8, ease: 'power3.out' });

// Image distortion effect on scroll
gsap.utils.toArray('.project-image').forEach(image => {
    gsap.to(image, {
        scrollTrigger: {
            trigger: image,
            scrub: true,
        },
        y: -100,
        ease: 'none',
    });
});

// Section animations
document.querySelectorAll('section').forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power3.out',
    });
});

// Skill card animations
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.5,
    stagger: 0.2,
});

// Project card animations
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.project-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.5,
    stagger: 0.2,
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

if (testimonials.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}


// Three.js scene setup
const threeContainer = document.getElementById('three-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
threeContainer.appendChild(renderer.domElement);

// Create a more complex 3D object
const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 150, 20);
const material = new THREE.MeshStandardMaterial({
    color: 0x007BFF,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x111111,
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 3);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-5, -5, -5);
scene.add(directionalLight);

camera.position.z = 5;

// Particles setup
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 10000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: 0x6C757D,
    transparent: true,
    blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse movement interaction
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Animate shape
    shape.rotation.x = 0.1 * elapsedTime;
    shape.rotation.y = 0.1 * elapsedTime;

    // Animate particles
    particlesMesh.rotation.y = -0.02 * elapsedTime;

    // Mouse follow effect
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Tilt effect for project cards
const tiltElements = document.querySelectorAll('.project-card');

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

// Dark/Light mode toggle
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Mode';
toggleButton.classList.add('toggle-mode');
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
