// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Create a crystal-like 3D object
const geometry = new THREE.OctahedronGeometry(1.5, 0);
const material = new THREE.MeshStandardMaterial({
    color: 0x007BFF,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x111111,
    transparent: true,
    opacity: 0.8,
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Mouse movement interaction
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    shape.rotation.x += (mouseY - shape.rotation.x) * 0.02;
    shape.rotation.y += (mouseX - shape.rotation.y) * 0.02;
});

// Scroll interaction
window.addEventListener('scroll', () => {
    const t = document.body.getBoundingClientRect().top;
    shape.rotation.x += t * -0.0001;
    shape.rotation.y += t * -0.0001;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.0005;
    shape.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
