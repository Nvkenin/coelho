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
const reachDistance = 50; // Distância que o coelho precisa chegar da cenoura para "comer"

// Velocidade do coelho (ajuste para ele ir mais rápido ou mais devagar)
const bunnySpeed = 0.05; // Pequeno valor para movimento suave

// Variáveis de controle de estado
let isMoving = false;
let carrotTimeout = null; // Para controlar o tempo da cenoura


// Função para atualizar a posição do coelho
function updateBunnyPosition() {
    // Calcula a diferença entre a posição atual do coelho e o alvo
    const dx = targetX - bunnyX;
    const dy = targetY - bunnyY;

    // Calcula a distância total
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Se a distância for muito pequena, para de mover e volta para ocioso
    if (distance < 5) { // Quase chegou ao alvo
        isMoving = false;
        bunny.classList.add('idle'); // Ativa animação de ocioso
        return; // Sai da função
    }

    isMoving = true;
    bunny.classList.remove('idle'); // Desativa animação de ocioso

    // Move o coelho suavemente em direção ao alvo
    bunnyX += dx * bunnySpeed;
    bunnyY += dy * bunnySpeed;

    // Atualiza a posição no CSS
    bunny.style.left = `${bunnyX}px`;
    bunny.style.top = `${bunnyY}px`;

    // Chamada recursiva para animar o movimento
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
        // Define o target para o coelho como a posição da cenoura
        targetX = e.clientX;
        targetY = e.clientY;
        // Inicia o movimento do coelho em direção à cenoura
        requestAnimationFrame(updateBunnyPosition);
    }
});


// Loop principal para checar a interação (pode ser executado com requestAnimationFrame para mais performance)
function gameLoop() {
    // Só verifica se a cenoura está visível
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
            if (carrotVisible) { // Garante que não coma a cenoura duas vezes seguidas
                carrot.classList.add('carrot-hidden'); // Anima para esconder
                carrotVisible = false; // A cenoura não está mais visível

                spawnHearts(carrotCenterX, carrotCenterY); // Solta corações

                // Define a próxima cenoura para aparecer após um tempo, no próximo movimento do mouse
                if (carrotTimeout) clearTimeout(carrotTimeout); // Limpa timeout anterior se houver
                carrotTimeout = setTimeout(() => {
                    carrot.classList.add('hidden'); // Esconde completamente após a animação de sumir
                }, 500); // Meio segundo para animação de sumir
            }
        }
    }
    requestAnimationFrame(gameLoop); // Continua o loop do jogo
}

// Inicia o loop do jogo
requestAnimationFrame(gameLoop);


// Função para gerar os corações
function spawnHearts(x, y) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Posiciona o coração onde a cenoura foi "comida"
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        // Define variáveis CSS personalizadas para o movimento aleatório dos corações
        // Ajustei os valores para que voem mais para a direita ou esquerda (devido à rotação)
        heart.style.setProperty('--rand-x', (Math.random() - 0.5) * 150 + 50); // Mais para a direita
        heart.style.setProperty('--rand-y', (Math.random() - 0.5) * 100 - 50); // Um pouco para cima/baixo

        heartsContainer.appendChild(heart);

        // Remove o coração após a animação terminar
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}