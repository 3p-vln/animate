const timerElement = document.querySelector('.timer span');
const hzElement = document.querySelector('.hz span');
const animateEl = document.querySelector('.box');

const startBtn = document.querySelector('.start');

let startTime = performance.now();
let animationStartTime = performance.now();
let animationFrameId = null;

let isAnimating = false;

let finalTime = 0;

// Таймер
function updateTimer() {
    if (!isAnimating) {
        // Если анимация закончена, показываем финальное время
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

// Анимация движения вправо (с разной герцовкой монитора разное время анимации)
function animate(time) {
    if (!isAnimating) return;

    const elapsedTime = time - animationStartTime;

    const marginLeft = Math.min(elapsedTime * 0.1, 500);

    animateEl.style.marginLeft = `${marginLeft}px`;

    if (marginLeft < 500) {
        animationFrameId = requestAnimationFrame(animate);
        return;
    }

    isAnimating = false;
    finalTime = time - startTime;
    cancelAnimationFrame(animationFrameId);
}

startBtn.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        animationStartTime = performance.now();
        startTime = performance.now();
        
        requestAnimationFrame(animate);
        setInterval(() => {
            if (isAnimating) {
                updateTimer();  // обновляем таймер каждый интервал
            }
        }, 10);
    }
});

measureRefreshRate();
