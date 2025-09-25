// Red Chakra particles background (like blood rain or destructive energy)
const canvas = document.getElementById("chakra");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height; // Start above screen for falling effect
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 3 + 1; // Faster fall for dramatic rain
    this.speedX = (Math.random() - 0.5) * 2; // Slight horizontal drift
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) {
      this.y = -10; // Reset to top
      this.x = Math.random() * canvas.width;
    }
    this.opacity = Math.sin(Date.now() * 0.001 + this.x) * 0.2 + 0.3; // Pulsing opacity for eerie glow
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(139, 0, 0, ${this.opacity})`; // Red particles
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#8B0000";
    ctx.fill();
  }
}

let particles = [];
for (let i = 0; i < 150; i++) particles.push(new Particle()); // More particles for denser effect

function animate() {
  ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; // Trail effect for depth
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Fade-in on scroll (enhanced for smoother Akatsuki drama)
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }; // Earlier trigger for sections

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Optional: Add subtle header shadow on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 20px rgba(139, 0, 0, 0.3)";
  } else {
    header.style.boxShadow = "none";
  }
});