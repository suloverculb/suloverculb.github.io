// DOM 元素
const display = document.getElementById('display');
const calculationHistory = document.getElementById('calculation-history');
const mascot = document.getElementById('mascot');
const speechBubble = document.getElementById('speech-bubble');
const easterEgg = document.getElementById('easter-egg');
const themeButtons = document.querySelectorAll('.theme-btn');
const buttons = document.querySelectorAll('.btn');
const body = document.documentElement;

// 計算機狀態變數
let currentInput = '0';
let previousInput = '';
let calculationOperator = '';
let shouldResetScreen = false;

// 吉祥物對話內容
const mascotPhrases = {
    greeting: [
        '你好呀～開始計算吧！',
        '有什麼需要算的嗎？',
        '今天過得如何呢？'
    ],
    calculating: [
        '讓我想想...',
        '嗯...正在計算中！',
        '算數時間到！'
    ],
    result: [
        '搞定啦！',
        '答案出來了喔！',
        '算對了嗎？',
        '好厲害～'
    ],
    error: [
        '哎呀，出錯了！',
        '這個不能算哦～',
        '我有點困惑...'
    ],
    encouragement: [
        '再多算一點嘛～',
        '數學很有趣對吧！',
        '你真是計算達人！'
    ]
};

// 隨機取得陣列中的一個元素
function getRandomPhrase(phrases) {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// 顯示吉祥物對話泡泡
function showSpeechBubble(phrases) {
    const message = getRandomPhrase(phrases);
    speechBubble.textContent = message;
    speechBubble.classList.add('show');
    
    // 三秒後隱藏對話泡泡
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 5000);
}

// 更新計算機顯示
function updateDisplay() {
    display.textContent = currentInput;
}

// 更新計算歷史 (稍微調整以配合 calculate 的修改)
function updateCalculationHistory() {
    // 只有在有待處理的運算符和前一個輸入時才顯示歷史
    if (calculationOperator && previousInput) {
        calculationHistory.textContent = previousInput + ' ' + calculationOperator;
    } else {
        calculationHistory.textContent = ''; // 其他情況清除歷史顯示
    }
}

// 增加數字到輸入
function inputDigit(digit) {
    if (shouldResetScreen) {
        currentInput = digit;
        shouldResetScreen = false;
    } else {
        // 如果當前輸入是 '0' 且不是小數點，則取代它
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}

// 增加小數點
function inputDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
    } else {
        // 如果當前輸入已經包含小數點，則不添加
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }
    updateDisplay();
}

// 修正連續按下運算符號時的計算邏輯
function handleOperator(operator) {
    // 解析當前輸入值
    const inputValue = parseFloat(currentInput);

    // 如果有上一個運算符且當前輸入不是空的，則先計算之前的結果
    if (calculationOperator && !shouldResetScreen) {
        calculate();
        // 這裡計算完後，currentInput 已經更新為計算結果
    }
    
    // 將當前輸入保存為上一次的輸入
    previousInput = currentInput;
    
    // 更新運算符號並準備下一次輸入
    calculationOperator = operator;
    shouldResetScreen = true;
    updateCalculationHistory();

    // 顯示計算中的吉祥物對話
    showSpeechBubble(mascotPhrases.calculating);
}

// 計算結果
function calculate() {
    // 如果在按下運算符後立即按下 =，則不執行計算，
    // 僅將當前數字視為結果並清除運算狀態。
    if (shouldResetScreen && calculationOperator) {
        calculationOperator = ''; // 清除運算符
        previousInput = '';     // 清除上一個輸入
        updateCalculationHistory(); // 清除歷史紀錄顯示
        // currentInput 維持不變 (即運算符前的數字)
        // shouldResetScreen 維持 true，準備接收新輸入

        // 顯示結果的吉祥物動畫和對話 (即使沒有實際計算)
        mascot.classList.add('jumping');
        showSpeechBubble(mascotPhrases.result);
        setTimeout(() => {
            mascot.classList.remove('jumping');
        }, 500);
        return; // 結束函數，跳過後續計算
    }

    // 解析數值 (正常計算流程: 數字 -> 運算符 -> 數字 -> =)
    const prevValue = parseFloat(previousInput);
    const currentValue = parseFloat(currentInput);

    // 檢查有效數字和運算符
    // 如果沒有有效的運算符或數字，則不執行任何操作
    if (!calculationOperator || isNaN(prevValue) || isNaN(currentValue)) {
        return;
    }

    // 執行計算
    let result;
    switch (calculationOperator) {
        case '+':
            result = prevValue + currentValue;
            break;
        case '-':
            result = prevValue - currentValue;
            break;
        case '*':
            result = prevValue * currentValue;
            break;
        case '/':
            // 檢查除以零的情況
            if (currentValue === 0) {
                showSpeechBubble(mascotPhrases.error);
                currentInput = 'Error';
                calculationOperator = '';
                previousInput = '';
                shouldResetScreen = true; // 出錯後也重置畫面
                updateDisplay();
                updateCalculationHistory(); // 清除歷史
                return;
            }
            result = prevValue / currentValue;
            break;
        case '%':
             if (currentValue === 0) { // 處理模數為零的錯誤
                showSpeechBubble(mascotPhrases.error);
                currentInput = 'Error';
                calculationOperator = '';
                previousInput = '';
                shouldResetScreen = true;
                updateDisplay();
                updateCalculationHistory();
                return;
            }
            result = prevValue % currentValue;
            break;
        default:
            return;
    }

    // 格式化結果，避免浮點數精度問題
    currentInput = parseFloat(result.toFixed(10)).toString();

    // 計算完成後清除狀態
    calculationOperator = '';
    previousInput = ''; // 清除上一個輸入
    shouldResetScreen = true; // 準備接收新輸入
    updateDisplay();
    updateCalculationHistory(); // 清除歷史紀錄顯示

    // 顯示結果的吉祥物動畫和對話
    mascot.classList.add('jumping');
    showSpeechBubble(mascotPhrases.result);

    setTimeout(() => {
        mascot.classList.remove('jumping');
    }, 500);
}

// 清除所有輸入
function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    calculationOperator = '';
    shouldResetScreen = false;
    updateDisplay();
    updateCalculationHistory();
    showSpeechBubble(mascotPhrases.greeting);
}

// 刪除最後一個字符
function deleteLastDigit() {
    if (currentInput.length === 1 || currentInput === 'Error') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// 切換主題
function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    // 儲存主題偏好到 localStorage
    localStorage.setItem('calculatorTheme', theme);
}

// 初始化主題
function initTheme() {
    const savedTheme = localStorage.getItem('calculatorTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
}

// 顯示隨機貼圖的彩蛋功能
function showEasterEgg() {
    // 建立彈出式視窗
    const popup = document.createElement('div');
    popup.className = 'sticker-popup';
    
    // 隨機選擇一個貼圖
    const stickerIndex = Math.floor(Math.random() * 3) + 1;
    const sticker = document.createElement('img');
    sticker.className = 'sticker';
    sticker.src = `assets/sticker-${stickerIndex}.png`;
    sticker.alt = '可愛貼圖';
    
    // 增加關閉按鈕
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '關閉';
    
    // 組合元素
    popup.appendChild(sticker);
    popup.appendChild(document.createTextNode('找到彩蛋啦！'));
    popup.appendChild(closeBtn);
    
    // 加入到頁面
    document.body.appendChild(popup);
    
    // 關閉按鈕功能
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// 註冊按鈕事件監聽器
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // 數字按鈕
        if (button.hasAttribute('data-number')) {
            inputDigit(button.getAttribute('data-number'));
            return;
        }
        
        // 根據按鈕的data-action屬性處理不同操作
        const action = button.getAttribute('data-action');
        
        if (!action) return;
        
        switch (action) {
            case 'decimal':
                inputDecimal();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                handleOperator(action);
                break;
            case '=':
                calculate();
                break;
            case 'clear':
                resetCalculator();
                break;
            case 'delete':
                deleteLastDigit();
                break;
        }
    });
});

// 註冊主題切換按鈕事件
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        setTheme(theme);
    });
});

// 吉祥物互動
mascot.addEventListener('click', () => {
    showSpeechBubble(mascotPhrases.encouragement);
});

// 彩蛋功能
easterEgg.addEventListener('click', showEasterEgg);

// 加載時初始化
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    resetCalculator();
    
    // 顯示初始吉祥物對話
    setTimeout(() => {
        showSpeechBubble(mascotPhrases.greeting);
    }, 1000);

    // 初始化Feather Icons
    feather.replace();
});