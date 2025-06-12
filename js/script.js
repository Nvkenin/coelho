// Seleciona o container do coelho
const rabbit = document.getElementById('rabbit-container');

// Armazena a posição atual do coelho
let rabbitX = window.innerWidth / 2;
let rabbitY = window.innerHeight / 2;

// Velocidade de movimento do coelho
const speed = 5;

// Captura posição atual do mouse
let mouseX = rabbitX;
let mouseY = rabbitY;

// Atualiza posição do mouse sempre que ele se move
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Função que move o coelho na direção do mouse
function moveRabbit() {
  const dx = mouseX - rabbitX;
  const dy = mouseY - rabbitY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    // Move proporcionalmente com base na distância
    rabbitX += dx / distance * speed;
    rabbitY += dy / distance * speed;

    rabbit.style.left = `${rabbitX - 32}px`; // Centraliza coelho
    rabbit.style.top = `${rabbitY - 32}px`;
  }

  // Se estiver muito próximo do mouse, gera um coração
  if (distance < 30) {
    spawnHeart(rabbitX, rabbitY);
  }

  requestAnimationFrame(moveRabbit);
}

// Cria um coração animado na posição do coelho
function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.body.appendChild(heart);

  // Remove coração após animação
  setTimeout(() => {
    heart.remove();
  }, 1000);
}

// Inicia a animação
moveRabbit();
