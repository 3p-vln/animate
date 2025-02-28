const timerElement = document.querySelector('.timer span');
const hzElement = document.querySelector('.hz span');
const animateEl = document.querySelector('.box');

const startBtn = document.querySelector('.start');

let startTime = performance.now();
let animationStartTime = performance.now();
const duration = 5000;

let isAnimating = false;

let finalTime = 0;

// Таймер
function updateTimer() {
    if (!isAnimating) {
        const elapsedTime = (finalTime / 1000).toFixed(2);
        timerElement.textContent = elapsedTime;
        
        return;
    }
    
    const currentTime = performance.now();
    const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2);
    timerElement.textContent = elapsedTime;
}

// Герцовка монитора
function measureRefreshRate() {
    let frames = 0;
    let startTime = performance.now();

    function checkFrame() {
        frames++;
        const now = performance.now();
        if (now - startTime >= 1000) {
            hzElement.textContent = frames;
            frames = 0;
            startTime = now;
        }
        requestAnimationFrame(checkFrame);
    }
    requestAnimationFrame(checkFrame);
}

function animate() {
    const value = (performance.now() - animationStartTime) / duration;
    if (value < 1) {
        animateEl.style.marginLeft = `${value * 500}px`;
        requestAnimationFrame((t) => animate(t));
        return;
    }
    
    animateEl.style.marginLeft = '500px';
    isAnimating = false;
    finalTime = performance.now() - animationStartTime;
}

// старт анимации по нажатию кнопки
startBtn.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        animationStartTime = performance.now();
        startTime = performance.now();
        animateEl.style.marginLeft = "0px";
        requestAnimationFrame(animate);
        setInterval(() => {
            if (isAnimating) {
                updateTimer();
            }
        }, 10);
    }
});

measureRefreshRate();
