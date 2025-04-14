document.addEventListener('DOMContentLoaded', function() {
    // 美食選項數據
    const foodOptions = [
        { 
            name: "拉麵", 
            img: "assets/ramen.png",
            desc: "暖呼呼的湯頭，讓你元氣滿滿！", 
        },
        { 
            name: "火鍋", 
            img: "assets/hotpot.png",
            desc: "一個人也要勇敢地涮火鍋！", 
        },
        { 
            name: "便當", 
            img: "assets/bento.png",
            desc: "營養均衡的選擇，健康又實惠！", 
        },
        { 
            name: "滷肉飯", 
            img: "assets/lu-rou.png",
            desc: "台灣的驕傲，簡單又美味！", 
        },
        { 
            name: "喝水減肥", 
            img: "assets/water.png",
            desc: "今天不如休息一下，喝水就好～", 
        },
        { 
            name: "壽司", 
            img: "assets/sushi.png",
            desc: "精緻的日式料理，讓你享受獨處時光！", 
        },
        { 
            name: "漢堡", 
            img: "assets/burger.png",
            desc: "快速又美味，忙碌時的好選擇！", 
        },
        { 
            name: "義大利麵", 
            img: "assets/pasta.png",
            desc: "今天要來點浪漫的異國風味～", 
        },
        { 
            name: "披薩", 
            img: "assets/pizza.png",
            desc: "犒賞自己的時刻到了！來點披薩吧！", 
        },
        { 
            name: "炸雞", 
            img: "assets/fried-chicken.png",
            desc: "酥脆可口，讓人無法抗拒！", 
        },
        { 
            name: "牛排", 
            img: "assets/steak.png",
            desc: "給自己一個獎勵，享受美味的牛排！", 
        },
        { 
            name: "甜點", 
            img: "assets/dessert.png",
            desc: "生活需要一點甜，來點甜點吧！", 
        },
        { 
            name: "炸醬麵", 
            img: "assets/zha-jiang-mian.png",
            desc: "經典的台灣小吃，讓你懷念的味道！", 
        },
        { 
            name: "牛肉麵", 
            img: "assets/beef-noodle.png",
            desc: "暖心又暖胃的選擇，讓你感受到家的溫暖！", 
        },
        { 
            name: "粽子", 
            img: "assets/zongzi.png",
            desc: "端午節必備，讓你回味無窮！", 
        },
        { 
            name: "蛋餅", 
            img: "assets/egg-pancake.png",
            desc: "早餐的最佳選擇，讓你一天都充滿活力！", 
        },
        { 
            name: "沙拉", 
            img: "assets/salad.png",
            desc: "輕盈健康的選擇，對身體好！", 
        }
    ];

    // 獲取DOM元素
    const foodCard = document.getElementById('food-card');
    const foodName = document.getElementById('food-name');
    const foodImage = document.getElementById('food-image');
    const foodDesc = document.getElementById('food-desc');
    const googleLink = document.getElementById('google-link');
    const resetBtn = document.getElementById('reset-btn');
    
    // 音效
    const flipSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-card-flip-2004.mp3');
    const successSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3');
    
    // 隱藏重置按鈕初始狀態
    resetBtn.style.display = 'none';
    
    // 初始化的食物選項（為了避免圖片錯誤，使用通用替代圖）
    const defaultImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23FFB5A7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='40' fill='white'%3E🍽️%3C/text%3E%3C/svg%3E";

    // 隨機選擇食物函數
    function selectRandomFood() {
        return foodOptions[Math.floor(Math.random() * foodOptions.length)];
    }

    // 更新卡片內容
    function updateCard(food) {
        // 檢測圖片是否存在，如果不存在則使用默認圖
        const img = new Image();
        img.onload = function() {
            foodImage.src = food.img;
        };
        img.onerror = function() {
            foodImage.src = defaultImg;
        };
        img.src = food.img;

        foodName.textContent = food.name;
        foodDesc.textContent = food.desc;
        googleLink.href = `https://www.google.com/search?q=${food.name}+餐廳+附近`;
    }

    // 卡片點擊事件
    foodCard.addEventListener('click', function() {
        if (!foodCard.classList.contains('flipped')) {
            // 播放翻牌音效
            flipSound.currentTime = 0;
            flipSound.play();
            
            // 選取隨機食物
            const selectedFood = selectRandomFood();
            
            // 更新卡片背面內容
            updateCard(selectedFood);
            
            // 翻轉卡片
            foodCard.classList.add('flipped');
            
            // 顯示重置按鈕（延遲顯示以配合動畫）
            setTimeout(() => {
                resetBtn.style.display = 'block';
                successSound.play();
            }, 600);
        }
    });

    // 重置按鈕點擊事件
    resetBtn.addEventListener('click', function() {
        // 翻回卡片
        foodCard.classList.remove('flipped');
        
        // 隱藏重置按鈕
        resetBtn.style.display = 'none';
        
        // 播放音效
        flipSound.currentTime = 0;
        flipSound.play();
    });

    // 添加初始動畫完成後的提示動畫
    setTimeout(() => {
        const cardSymbol = document.querySelector('.card-symbol');
        if (cardSymbol) {
            cardSymbol.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        }
    }, 2000);
});