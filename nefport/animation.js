// Select the canvas and set up context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas dynamically on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(); // Reinitialize particles
});

// Set the background color
ctx.fillStyle = "#b9a377"; // Set the background color to #b9a377
ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with the background color

// Particle class for creating floating, fading particles
class Particle {
  constructor(x, y, radius, color, speedX, speedY, opacity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.opacity = opacity;
    this.initialOpacity = opacity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // Update particle position
    this.x += this.speedX;
    this.y += this.speedY;

    // Particle fade effect (opacity changes over time)
    this.opacity -= 0.002; // Fade out gradually
    if (this.opacity <= 0) {
      this.opacity = this.initialOpacity; // Reset opacity when fully faded
      this.x = Math.random() * canvas.width; // Randomize position
      this.y = Math.random() * canvas.height;
    }

    // Draw particle
    this.draw();
  }
}

// Initialize particles
let particlesArray = [];
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 5 + 2; // Random size for particles
    const x = Math.random() * canvas.width; // Random start position
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 2; // Random horizontal speed
    const speedY = (Math.random() - 0.5) * 2; // Random vertical speed
    const opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1
    const color = "255, 255, 255"; // White color for the particles
    particlesArray.push(new Particle(x, y, radius, color, speedX, speedY, opacity));
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing new frame
  ctx.fillStyle = "#b9a377"; // Reset background color on each frame
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Refill the background

  particlesArray.forEach((particle) => {
    particle.update(); // Update the particle position and opacity
  });

  requestAnimationFrame(animate); // Keep animating
}

// Start animation
initParticles();
animate();
