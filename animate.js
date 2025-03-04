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

// анимация движения вправо
function animate(time) {
    if (!isAnimating) return;

    // время прошедшее с предыдущего кадра
    const deltaTime = (time - animationStartTime)/1000;
    animationStartTime = time;

    const speed = 100; // 100 пикселей в секунду
    const marginLeft = parseFloat((deltaTime * speed).toFixed(10)); // шаг в пикселях (скорость * время)
    const currMarginLeft = parseFloat(parseFloat(window.getComputedStyle(animateEl).marginLeft).toFixed(10)); //текущая позиция
    const marginLeftChange = marginLeft + currMarginLeft; //новая позиция

    animateEl.style.marginLeft = `${marginLeftChange}px`;

    if (marginLeftChange < 500) {
        animationFrameId = requestAnimationFrame(animate);
        return;
    }

    isAnimating = false;
    finalTime = time - startTime;
    cancelAnimationFrame(animationFrameId);
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
