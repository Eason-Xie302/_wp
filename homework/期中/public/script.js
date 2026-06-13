// ==========================================
// 1. DOM 元素選取 (對應 HTML 的 ID，一個都不能少)
// ==========================================
const difficultySelect = document.getElementById('difficulty');
const interferenceCheckbox = document.getElementById('interference-mode');
const chaosCheckbox = document.getElementById('chaos-mode');
const blindCheckbox = document.getElementById('blind-mode');

const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer-display');
const nextTargetDisplay = document.getElementById('next-target');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardDiffLabel = document.getElementById('leaderboard-diff-label');
const gridContainer = document.getElementById('grid-container');

// ==========================================
// 2. 遊戲狀態管理中心
// ==========================================
const gameState = {
    size: 5,
    maxNumber: 25,
    expectedNumber: 1,
    status: 'idle',
    startTime: 0,
    elapsedMs: 0,
    penaltyMs: 0,          
    timerInterval: null,   
    chaosInterval: null,   
    blindTimeout: null,    
    flashTimeout: null     
};

// ==========================================
// 3. 核心工具函式
// ==========================================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    const h = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${m}:${s}.${h}`;
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
}

function clearAllGameTimers() {
    clearInterval(gameState.timerInterval);
    clearInterval(gameState.chaosInterval);
    clearTimeout(gameState.blindTimeout);
    clearTimeout(gameState.flashTimeout);
}

// ==========================================
// 4. 排行榜系統
// ==========================================
const StorageKey = 'schulte_leaderboard';

function getLeaderboard(size) {
    const data = JSON.parse(localStorage.getItem(StorageKey)) || {};
    return data[size] || [];
}

function saveRecord(size, timeMs) {
    const data = JSON.parse(localStorage.getItem(StorageKey)) || {};
    if (!data[size]) data[size] = [];
    data[size].push(timeMs);
    data[size].sort((a, b) => a - b);
    data[size] = data[size].slice(0, 3);
    localStorage.setItem(StorageKey, JSON.stringify(data));
}

function renderLeaderboard() {
    const currentSize = difficultySelect.value;
    leaderboardDiffLabel.textContent = `${currentSize}x${currentSize}`;
    const records = getLeaderboard(currentSize);
    leaderboardList.innerHTML = '';

    if (records.length === 0) {
        leaderboardList.innerHTML = '<li class="empty-msg">暫無紀錄</li>';
        return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    records.forEach((timeMs, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${medals[index]} 第 ${index + 1} 名</span> <span>${formatTime(timeMs)}</span>`;
        leaderboardList.appendChild(li);
    });
}

// ==========================================
// 5. 進階模式邏輯
// ==========================================
function swapRandomCells() {
    if (gameState.status !== 'playing') return;

    let unclickedCells = Array.from(document.querySelectorAll('.grid-item:not(.correct)'));
    if (unclickedCells.length < 2) return;

    const maxPairs = 4;
    const availablePairs = Math.floor(unclickedCells.length / 2);
    const pairsToSwap = Math.min(maxPairs, availablePairs);

    unclickedCells = shuffleArray(unclickedCells);

    for (let i = 0; i < pairsToSwap * 2; i += 2) {
        const cell1 = unclickedCells[i];
        const cell2 = unclickedCells[i + 1];

        const tempNum = cell1.dataset.num;
        cell1.dataset.num = cell2.dataset.num;
        cell2.dataset.num = tempNum;

        const tempText = cell1.textContent;
        cell1.textContent = cell2.textContent;
        cell2.textContent = tempText;

        cell1.classList.add('chaos-swap');
        cell2.classList.add('chaos-swap');
        
        setTimeout(() => {
            cell1.classList.remove('chaos-swap');
            cell2.classList.remove('chaos-swap');
        }, 300);
    }
}

function triggerBlindFlash() {
    gridContainer.classList.remove('blind-active');
    gridContainer.classList.add('blind-flash');

    clearTimeout(gameState.flashTimeout);

    gameState.flashTimeout = setTimeout(() => {
        if (gameState.status === 'playing') {
            gridContainer.classList.add('blind-active');
            gridContainer.classList.remove('blind-flash');
        }
    }, 500);
}

// ==========================================
// 6. 遊戲流程控制
// ==========================================
function setupGrid() {
    gameState.size = parseInt(difficultySelect.value);
    gameState.maxNumber = gameState.size * gameState.size;
    gameState.expectedNumber = 1;
    gameState.status = 'idle';
    gameState.elapsedMs = 0;
    gameState.penaltyMs = 0; 

    clearAllGameTimers();

    timerDisplay.textContent = "00:00.00";
    timerDisplay.classList.remove('highlight');
    nextTargetDisplay.textContent = "準備";
    
    gridContainer.classList.add('disabled');
    gridContainer.classList.remove('blind-active', 'blind-flash');
    gridContainer.innerHTML = '';
    
    renderLeaderboard();

    let numbers = Array.from({ length: gameState.maxNumber }, (_, i) => i + 1);
    numbers = shuffleArray(numbers);

    gridContainer.style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gameState.size}, 1fr)`;

    const isInterference = interferenceCheckbox.checked;

    numbers.forEach(num => {
        const cell = document.createElement('div');
        cell.className = 'grid-item';
        cell.textContent = num;
        cell.dataset.num = num;
        
        if (isInterference) {
            cell.style.backgroundColor = getRandomColor();
            cell.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(${Math.random() * 0.4 + 0.8})`;
        }

        cell.addEventListener('click', () => handleCellClick(cell));
        gridContainer.appendChild(cell);
    });
}

function startCountdown() {
    if (gameState.status === 'countdown') return;
    
    setupGrid();
    gameState.status = 'countdown';
    startBtn.disabled = true;
    
    let count = 3;
    timerDisplay.classList.add('highlight');
    timerDisplay.textContent = `倒數 ${count}...`;
    nextTargetDisplay.textContent = "-";

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            timerDisplay.textContent = `倒數 ${count}...`;
        } else {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    gameState.status = 'playing';
    gameState.startTime = Date.now();
    gameState.expectedNumber = 1;
    startBtn.disabled = false;
    startBtn.textContent = "重新開始";
    
    gridContainer.classList.remove('disabled');
    nextTargetDisplay.textContent = gameState.expectedNumber;

    gameState.timerInterval = setInterval(() => {
        gameState.elapsedMs = (Date.now() - gameState.startTime) + gameState.penaltyMs;
        timerDisplay.textContent = formatTime(gameState.elapsedMs);
    }, 10);

    if (chaosCheckbox.checked) {
        gameState.chaosInterval = setInterval(swapRandomCells, 1500);
    }

    if (blindCheckbox.checked) {
        gameState.blindTimeout = setTimeout(() => {
            if (gameState.status === 'playing') {
                gridContainer.classList.add('blind-active');
            }
        }, 500);
    }
}

function endGame() {
    gameState.status = 'idle';
    clearAllGameTimers(); 
    
    gridContainer.classList.add('disabled');
    gridContainer.classList.remove('blind-active', 'blind-flash'); 
    
    nextTargetDisplay.textContent = "完成!";
    startBtn.textContent = "開始遊戲";
    
    saveRecord(gameState.size, gameState.elapsedMs);
    renderLeaderboard();

    setTimeout(() => {
        alert(`太神啦！你完成了 ${gameState.size}x${gameState.size}\n包含懲罰的總成績：${formatTime(gameState.elapsedMs)}`);
    }, 50);
}

function handleCellClick(cell) {
    if (gameState.status !== 'playing') return;

    const clickedNum = parseInt(cell.dataset.num, 10);

    if (clickedNum === gameState.expectedNumber) {
        cell.classList.add('correct');
        cell.style.transform = 'none'; 
        cell.classList.remove('chaos-swap'); 
        
        if (gameState.expectedNumber === gameState.maxNumber) {
            endGame();
        } else {
            gameState.expectedNumber++;
            nextTargetDisplay.textContent = gameState.expectedNumber;
        }
    } else {
        if (clickedNum < gameState.expectedNumber) return; 

        if (blindCheckbox.checked && gridContainer.classList.contains('blind-active')) {
            gameState.penaltyMs += 1000; 
            triggerBlindFlash();
        }

        cell.classList.add('wrong');
        setTimeout(() => cell.classList.remove('wrong'), 300);
    }
}

// ==========================================
// 7. 事件監聽與初始掛載
// ==========================================
startBtn.addEventListener('click', startCountdown);
difficultySelect.addEventListener('change', setupGrid);
window.addEventListener('DOMContentLoaded', setupGrid);