const rabbit = document.getElementById('rabbit');

// Posição inicial do coelho e do cursor
let rabbitX = window.innerWidth / 2;
let rabbitY = window.innerHeight / 2;
let mouseX = rabbitX;
let mouseY = rabbitY;
const speed = 3;

// Detecta movimento do mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateRabbit() {
  const dx = mouseX - rabbitX;
  const dy = mouseY - rabbitY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Move coelho em direção ao mouse
  if (distance > 1) {
    rabbitX += dx / distance * speed;
    rabbitY += dy / distance * speed;
    rabbit.style.left = `${rabbitX - 25}px`;
    rabbit.style.top = `${rabbitY - 25}px`;
  }

  // Se o coelho alcançar o mouse, pula e solta corações
  if (distance < 40) {
    rabbit.style.transform = 'translateY(-10px)';
    spawnHeart(rabbitX, rabbitY);
    setTimeout(() => rabbit.style.transform = 'translateY(0)', 150);
  }

  requestAnimationFrame(animateRabbit);
}

// Cria um coração flutuante
function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

animateRabbit();
