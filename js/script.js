const rabbit = document.getElementById('rabbit');
let rx = innerWidth/2, ry = innerHeight/2;
let mx = rx, my = ry;
const speed = 4, threshold = 40;
let canHeart = true;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
});

function loop() {
  const dx = mx - rx, dy = my - ry;
  const dist = Math.hypot(dx, dy);
  if (dist > 1) {
    rx += (dx / dist) * speed;
    ry += (dy / dist) * speed;
    rabbit.style.left = `${rx - 30}px`;
    rabbit.style.top = `${ry - 30}px`;

    // Vira
    const angle = Math.atan2(dy, dx);
    const deg = angle * 180 / Math.PI;
    rabbit.style.transform = `rotate(${deg}deg)`;
  }

  if (dist < threshold && canHeart) {
    spawnHeart(rx, ry);
    canHeart = false;
    setTimeout(() => canHeart = true, 500);
  }

  requestAnimationFrame(loop);
}

function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

loop();
