// 等待文檔完全載入
document.addEventListener('DOMContentLoaded', () => {
    // 添加淡入效果到所有區塊
    addFadeInEffectOnScroll();
    
    // 為導航欄添加滾動監聽
    handleNavbarScroll();
    
    // 初始化推薦項目的佔位符圖片
    setupPlaceholderImages();
    
    // === 漢堡選單互動 ===
    const hamburger = document.querySelector('.main-nav .hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});

/**
 * 為元素添加滾動時的淡入效果
 */
function addFadeInEffectOnScroll() {
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const elementsToAnimate = [...sections, footer];
    
    // 設置初始透明度為0
    elementsToAnimate.forEach(elem => {
        if (elem && !isElementInViewport(elem)) {
            elem.style.opacity = "0";
        }
    });
    
    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        elementsToAnimate.forEach(elem => {
            if (elem && isElementInViewport(elem)) {
                elem.classList.add('fade-in');
            }
        });
    });
    
    // 初始檢查一次，以防有些元素已在視窗中
    elementsToAnimate.forEach(elem => {
        if (elem && isElementInViewport(elem)) {
            elem.classList.add('fade-in');
        }
    });
}

/**
 * 處理導航欄的滾動行為
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.main-nav');
    const heroHeight = document.querySelector('.hero-banner').offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - 100) {
            navbar.style.backgroundColor = 'rgba(248, 245, 240, 0.95)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'var(--ivory)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }
    });
}

/**
 * 設置推薦項目的佔位符圖片
 */
function setupPlaceholderImages() {
    const placeholders = document.querySelectorAll('.placeholder');
    
    // 這裡可以添加實際的圖片URL
    const imageUrls = [
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', // 山形鬆餅
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', // 閱讀角
        'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'  // 紅茶歐蕾
    ];
    
    placeholders.forEach((img, index) => {
        if (imageUrls[index]) {
            img.src = imageUrls[index];
            img.classList.remove('placeholder');
        }
    });
}

/**
 * 檢查元素是否在可視區域內
 * @param {HTMLElement} el - 要檢查的HTML元素
 * @returns {boolean} - 是否在可視區域內
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        (rect.top <= windowHeight * 0.8) && // 元素頂部在視窗80%以內
        (rect.bottom >= 0) // 元素底部在視窗上方
    );
}

/**
 * 平滑滾動到頁面各區塊
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // 扣除導航欄高度
                behavior: 'smooth'
            });
        }
    });
});