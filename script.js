// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Create a more complex 3D object
const geometry = new THREE.IcosahedronGeometry(1.5, 0);
const material = new THREE.MeshStandardMaterial({
    color: 0x8A2BE2,
    roughness: 0.2,
    metalness: 0.8,
    wireframe: true
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Mouse movement interaction
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    shape.rotation.x += (mouseY - shape.rotation.x) * 0.05;
    shape.rotation.y += (mouseX - shape.rotation.y) * 0.05;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
