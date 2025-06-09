// 使用立即執行函數表達式 (IIFE) 保持程式碼封裝，避免污染全局命名空間
(function() {
    // 獲取頁面元素
    const jpyInput = document.getElementById('jpy-amount');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultAmount = document.getElementById('result-amount');
    const exchangeRateElem = document.getElementById('exchange-rate');
    const lastUpdateElem = document.getElementById('last-update');
    
    // 預設匯率（以防API無法獲取數據時使用）
    let exchangeRate = 0.22; // 1 JPY ≈ 0.22 TWD (預設值)    // 初始化函數
    function init() {
        // 綁定事件監聽器
        convertBtn.addEventListener('click', updateExchangeRate); // 更改為更新匯率功能
        clearBtn.addEventListener('click', clearAll);
        jpyInput.addEventListener('keypress', handleKeyPress);
        // 添加即時換算功能 - 監聽輸入事件
        jpyInput.addEventListener('input', convertCurrency);
        
        // 載入最新匯率
        fetchExchangeRate();
    }
    
    // 手動更新匯率
    function updateExchangeRate() {
        // 顯示正在更新的提示
        exchangeRateElem.textContent = '正在更新匯率...';
        
        // 重新獲取匯率
        fetchExchangeRate().then(() => {
            // 更新成功後重新計算當前結果
            if (jpyInput.value) {
                convertCurrency();
            }
        });
    }
      // 從API獲取最新匯率
    async function fetchExchangeRate() {
        try {
            // 使用免費的匯率API
            const response = await fetch('https://open.er-api.com/v6/latest/JPY');
            const data = await response.json();
            
            if (data && data.rates && data.rates.TWD) {
                // 獲取JPY對TWD的匯率
                exchangeRate = data.rates.TWD;
                // 格式化匯率顯示，保留4位小數
                exchangeRateElem.textContent = `1 JPY = ${exchangeRate.toFixed(4)} TWD`;
                
                // 更新最後更新時間
                const now = new Date();
                lastUpdateElem.textContent = `最後更新時間: ${formatDateTime(now)}`;
            } else {
                throw new Error('無法獲取匯率數據');
            }
        } catch (error) {
            console.error('獲取匯率時出錯:', error);
            // 顯示錯誤信息並使用預設匯率
            exchangeRateElem.textContent = `1 JPY ≈ ${exchangeRate.toFixed(4)} TWD (預設值)`;
            lastUpdateElem.textContent = `無法更新匯率，使用預設值`;
        }
    }
    
    // 格式化日期和時間
    function formatDateTime(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleDateString('zh-TW', options);
    }
      // 執行貨幣轉換
    function convertCurrency() {
        const jpyAmount = parseFloat(jpyInput.value);
        
        // 檢查輸入是否有效
        if (isNaN(jpyAmount) || jpyAmount <= 0) {
            // 對於即時換算，如果輸入為空或無效，只顯示0而不報錯
            resultAmount.textContent = '0.00';
            // 移除任何錯誤樣式
            jpyInput.classList.remove('error');
            return;
        }
        
        // 計算台幣金額
        const twdAmount = jpyAmount * exchangeRate;
        
        // 顯示結果，使用千位分隔符並保留2位小數
        resultAmount.textContent = formatNumber(twdAmount);
        
        // 添加輕微的動畫效果
        animateResult();
    }
    
    // 格式化數字為千位分隔且保留2位小數
    function formatNumber(number) {
        return number.toLocaleString('zh-TW', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    // 清除所有輸入和結果
    function clearAll() {
        jpyInput.value = '';
        resultAmount.textContent = '0.00';
        // 移除任何錯誤樣式
        jpyInput.classList.remove('error');
    }
      // 處理按鍵事件 (按下Enter鍵時更新匯率)
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            updateExchangeRate();
        }
    }
    
    // 顯示錯誤訊息
    function showError(message) {
        // 實現簡單的錯誤提示
        alert(message);
        // 添加錯誤樣式
        jpyInput.classList.add('error');
        // 聚焦輸入欄位
        jpyInput.focus();
    }
    
    // 添加簡單的動畫效果
    function animateResult() {
        const resultElement = document.getElementById('twd-result');
        resultElement.classList.add('highlight');
        
        // 移除動畫類別以便下次使用
        setTimeout(() => {
            resultElement.classList.remove('highlight');
        }, 700);
    }
      // 當文檔載入完成時執行初始化
    document.addEventListener('DOMContentLoaded', () => {
        init();
        
        // 添加即時換算提示
        const resultContainer = document.querySelector('.result-container');
        const realTimeNotice = document.createElement('div');
        realTimeNotice.className = 'realtime-notice';
        realTimeNotice.innerHTML = '<i class="fas fa-bolt"></i> 即時換算已啟用';
        resultContainer.appendChild(realTimeNotice);
        
        // 3秒後淡出提示
        setTimeout(() => {
            realTimeNotice.style.opacity = '0';
            setTimeout(() => {
                realTimeNotice.remove();
            }, 1000);
        }, 3000);
    });
})();

// 添加動畫效果的CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes highlight {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .highlight {
        animation: highlight 0.7s ease;
    }
    
    .error {
        border-color: var(--error-color) !important;
    }
    
    .realtime-notice {
        background-color: var(--success-color);
        color: white;
        padding: 8px 12px;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: opacity 1s ease;
    }
</style>
`);