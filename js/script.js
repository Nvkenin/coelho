// script.js

const bunny = document.getElementById('bunny');
const carrot = document.getElementById('carrot');
const gameArea = document.getElementById('game-area');
const heartsContainer = document.getElementById('hearts-container');

// Posição inicial do coelho (centro da tela)
let bunnyX = window.innerWidth / 2;
let bunnyY = window.innerHeight / 2;

// Posição do mouse (nosso alvo)
let targetX = bunnyX;
let targetY = bunnyY;

// Cenoura
const carrotSize = 50; // Tamanho da cenoura para cálculo de distância
let carrotVisible = false;
const reachDistance = 100; // Distância que o coelho precisa chegar da cenoura para "comer". **Ajustado para o ASCII art grande!**

// Velocidade do coelho (ajuste para ele ir mais rápido ou mais devagar)
const bunnySpeed = 0.03; // Velocidade um pouco mais lenta para animação de andar ser visível

// Variáveis de controle de estado
let isMoving = false;
let carrotTimeout = null; // Para controlar o tempo da cenoura


// Função para atualizar a posição do coelho
function updateBunnyPosition() {
    const dx = targetX - bunnyX;
    const dy = targetY - bunnyY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) { // Quase chegou ao alvo (um pouco maior para ASCII art)
        if (isMoving) { // Só muda para idle se estava se movendo
            isMoving = false;
            bunny.classList.remove('moving');
            bunny.classList.add('idle'); // Ativa animação de ocioso
        }
        return;
    }

    if (!isMoving) { // Só muda para moving se estava parado
        isMoving = true;
        bunny.classList.remove('idle');
        bunny.classList.add('moving'); // Ativa animação de andar
    }

    bunnyX += dx * bunnySpeed;
    bunnyY += dy * bunnySpeed;

    bunny.style.left = `${bunnyX}px`;
    bunny.style.top = `${bunnyY}px`;

    requestAnimationFrame(updateBunnyPosition);
}

// Inicia a animação de ocioso quando a página carrega
bunny.classList.add('idle');
// Inicia o loop de movimento (ele só vai se mover quando o targetX/Y for diferente)
requestAnimationFrame(updateBunnyPosition);


// Evento: Mouse se move na página
gameArea.addEventListener('mousemove', (e) => {
    // A cenoura aparece onde o mouse está, se ela não estiver visível
    if (!carrotVisible) {
        carrot.style.left = `${e.clientX}px`;
        carrot.style.top = `${e.clientY}px`;
        carrot.classList.remove('hidden', 'carrot-hidden'); // Mostra a cenoura
        carrotVisible = true;
        
        targetX = e.clientX;
        targetY = e.clientY;
        // Inicia o movimento do coelho em direção à cenoura
        requestAnimationFrame(updateBunnyPosition);
    }
});


// Loop principal para checar a interação
function gameLoop() {
    if (carrotVisible) {
        const bunnyRect = bunny.getBoundingClientRect();
        const carrotRect = carrot.getBoundingClientRect();

        // Calcula os centros para uma detecção de colisão mais precisa
        const bunnyCenterX = bunnyRect.left + bunnyRect.width / 2;
        const bunnyCenterY = bunnyRect.top + bunnyRect.height / 2;
        const carrotCenterX = carrotRect.left + carrotRect.width / 2;
        const carrotCenterY = carrotRect.top + carrotRect.height / 2;

        const distance = Math.sqrt(
            Math.pow(bunnyCenterX - carrotCenterX, 2) +
            Math.pow(bunnyCenterY - carrotCenterY, 2)
        );

        // Se o coelho está perto o suficiente da cenoura
        if (distance < reachDistance) {
            if (carrotVisible) {
                carrot.classList.add('carrot-hidden'); // Anima para esconder
                carrotVisible = false;

                // Solta corações do centro da cenoura
                spawnHearts(carrotCenterX, carrotCenterY);

                if (carrotTimeout) clearTimeout(carrotTimeout);
                carrotTimeout = setTimeout(() => {
                    carrot.classList.add('hidden'); // Esconde completamente
                }, 500); // Meio segundo para animação de sumir
            }
        }
    }
    requestAnimationFrame(gameLoop);
}

// Inicia o loop do jogo
requestAnimationFrame(gameLoop);


// Função para gerar os corações
function spawnHearts(x, y) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '<3'; // Usamos o caractere '<3' para o coração ASCII

        // Posiciona o coração onde a cenoura foi "comida"
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        // Define variáveis CSS personalizadas para o movimento aleatório dos corações
        // Eles voam mais para os lados (horizontalmente)
        // Valores ajustados para voar para a direita ou esquerda de forma mais acentuada
        heart.style.setProperty('--rand-x', (Math.random() - 0.5) * 400); // Mais para a direita/esquerda
        heart.style.setProperty('--rand-y', (Math.random() - 0.5) * 100 - 50); // Um pouco para cima/baixo, mas menos que X

        heartsContainer.appendChild(heart);

        // Remove o coração após a animação terminar
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}