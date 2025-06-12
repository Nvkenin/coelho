// script.js
// (Conteúdo idêntico ao anterior, não precisa de alterações)

// Pega referências para os elementos HTML
const bunny = document.getElementById('bunny');
const carrot = document.getElementById('carrot');
const gameArea = document.getElementById('game-area');
const heartsContainer = document.getElementById('hearts-container');

// Variáveis para controlar a posição da cenoura
let carrotX = 0;
let carrotY = 0;
const carrotOffset = 50; // Distância mínima entre coelho e cenoura para "comer", ajustado para elementos menores

// Define a posição inicial da cenoura de forma aleatória
function setRandomCarrotPosition() {
    // Calcula posições aleatórias dentro da área do jogo
    carrotX = Math.random() * (gameArea.offsetWidth - carrot.offsetWidth);
    carrotY = Math.random() * (gameArea.offsetHeight - carrot.offsetHeight);

    // Aplica a posição à cenoura usando CSS 'left' e 'top'
    carrot.style.left = `${carrotX}px`;
    carrot.style.top = `${carrotY}px`;
    carrot.classList.remove('carrot-hidden'); // Garante que a cenoura esteja visível
}

// Chama a função para posicionar a cenoura quando a página carrega
setRandomCarrotPosition();

// Evento que escuta o movimento do mouse em toda a área do jogo
gameArea.addEventListener('mousemove', (e) => {
    // Atualiza a posição do coelho para seguir o cursor do mouse
    bunny.style.left = `${e.clientX}px`;
    bunny.style.top = `${e.clientY}px`;

    // Calcula a distância entre o centro do coelho e o centro da cenoura
    const bunnyRect = bunny.getBoundingClientRect();
    const carrotRect = carrot.getBoundingClientRect();

    const bunnyCenterX = bunnyRect.left + bunnyRect.width / 2;
    const bunnyCenterY = bunnyRect.top + bunnyRect.height / 2;
    const carrotCenterX = carrotRect.left + carrotRect.width / 2;
    const carrotCenterY = carrotRect.top + carrotRect.height / 2;

    const distanceX = Math.abs(bunnyCenterX - carrotCenterX);
    const distanceY = Math.abs(bunnyCenterY - carrotCenterY);

    // Se o coelho estiver perto o suficiente da cenoura
    if (distanceX < carrotOffset && distanceY < carrotOffset && !carrot.classList.contains('carrot-hidden')) {
        carrot.classList.add('carrot-hidden'); // Esconde a cenoura
        spawnHearts(carrotX + carrot.offsetWidth / 2, carrotY + carrot.offsetHeight / 2); // Gera corações onde a cenoura estava
        
        // Coloca uma nova cenoura depois de um pequeno atraso
        setTimeout(() => {
            setRandomCarrotPosition();
        }, 1000); // 1 segundo de atraso
    }
});

// Função para gerar os corações
function spawnHearts(x, y) {
    for (let i = 0; i < 5; i++) { // Gera 5 corações
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Posiciona o coração onde a cenoura foi "comida"
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        // Define variáveis CSS personalizadas para o movimento aleatório dos corações
        heart.style.setProperty('--rand-x', (Math.random() - 0.5) * 200);
        heart.style.setProperty('--rand-y', (Math.random() - 0.5) * 200 - 100);

        heartsContainer.appendChild(heart);

        // Remove o coração após a animação terminar para não sobrecarregar o DOM
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}