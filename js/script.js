const rabbit = document.getElementById('rabbit');

let rabbitX = window.innerWidth / 2;
let rabbitY = window.innerHeight / 2;
let mouseX = rabbitX;
let mouseY = rabbitY;
const speed = 3;
let canSpawnHeart = true;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateRabbit() {
  const dx = mouseX - rabbitX;
  const dy = mouseY - rabbitY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    rabbitX += dx / distance * speed;
    rabbitY += dy / distance * speed;
    rabbit.style.left = `${rabbitX - 25}px`;
    rabbit.style.top = `${rabbitY - 25}px`;
  }

  if (distance < 40 && canSpawnHeart) {
    rabbit.style.transform = 'translateY(-10px)';
    spawnHeart(rabbitX, rabbitY);
    canSpawnHeart = false;
    setTimeout(() => {
      rabbit.style.transform = 'translateY(0)';
      canSpawnHeart = true;
    }, 300);
  }

  requestAnimationFrame(animateRabbit);
}

function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

animateRabbit();
