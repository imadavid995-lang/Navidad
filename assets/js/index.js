const treeContainer = document.createElement("pre");
const mainContainer = document.querySelector(".main-container");

const createTree = (size) => {
  for (let i = 0; i < size; i++) {
    const spanElement = document.createElement("span");
    const branch = i === 0 || i === size - 1 ? "*\n" : `${"*".repeat(i * 2)}\n`;
    spanElement.textContent = branch;
    treeContainer.appendChild(spanElement);
  }
  mainContainer.appendChild(treeContainer);
};

const getRandomValue = (max, min = 1) => {
  return Math.floor(Math.random() * max) + min;
};

const createSnow = (density) => {
  for (let i = 0; i < density; i++) {
    const snowFlake = document.createElement("span");
    const horizontalPosition = `${getRandomValue(100)}%`;
    const fallDelay = `${getRandomValue(100)}s`;
    const fallDuration = `${getRandomValue(20, 5)}s`;
    const flakeSize = `${getRandomValue(7, 1)}px`;
    const flakeOpacity = Math.random().toFixed(2);

    snowFlake.classList.add("snow");
    snowFlake.style.opacity = flakeOpacity;
    snowFlake.style.width = flakeSize;
    snowFlake.style.height = flakeSize;
    snowFlake.style.animation = `fall ${fallDuration} ${fallDelay} linear infinite`;
    snowFlake.style.right = horizontalPosition;

    mainContainer.appendChild(snowFlake);
  }
};

createTree(18);
createSnow(300);


const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const particles = 50;

  for (let i = 0; i < particles; i++) {
    const angle = (Math.PI * 2 / particles) * i;
    const speed = Math.random() * 4 + 2;

    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

    drawParticle(x, y, vx, vy, color);
  }
}

function drawParticle(x, y, vx, vy, color) {
  let life = 60;

  function animate() {
    if (life <= 0) return;

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    x += vx;
    y += vy;
    life--;

    requestAnimationFrame(animate);
  }

  animate();
}

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  launchFirework();
}, 800);
