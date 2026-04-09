// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHT
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(2, 3, 4);
scene.add(light);

// OBJECTS
const shape = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 1),
  new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true })
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1.5, 0.4, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0xff00c8 })
);

// PARTICLES
const particlesGeometry = new THREE.BufferGeometry();
const count = 1500;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particles = new THREE.Points(
  particlesGeometry,
  new THREE.PointsMaterial({ size: 0.02 })
);

// ADD TO SCENE
scene.add(shape);
scene.add(torus);
scene.add(particles);

// 🔥 DEPTH
shape.position.x = -2;
torus.position.x = 2;
particles.position.z = -2;

// MOUSE
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = e.clientY / window.innerHeight - 0.5;
});

// ANIMATION
function animate() {
  requestAnimationFrame(animate);

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;

  particles.rotation.y += 0.0005;

  camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;

  renderer.render(scene, camera);
}
animate();

// GSAP
gsap.from(".hero h1", { y: 100, opacity: 0, duration: 1 });
gsap.from(".hero p", { y: 50, opacity: 0, delay: 0.3 });
gsap.from(".btn", { scale: 0, delay: 0.6 });

// SCROLL EFFECT
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  shape.rotation.y = scrollY * 0.001;
  torus.rotation.x = scrollY * 0.001;

  particles.position.y = -scrollY * 0.002;
});

// GSAP SCROLL ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.card').forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

// MAGNETIC BUTTON
const button = document.querySelector(".btn");

if (button) {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = `translate(0px, 0px)`;
  });
}

// RESIZE
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});