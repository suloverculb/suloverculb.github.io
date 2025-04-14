## 🎯 頁面概念
以「抽籤」形式幫助使用者決定今天要吃什麼，卡片背後可能是食物類型（例如：火鍋、壽司、漢堡）、具體店家、或搞笑的提議（例如「減肥吧，喝水」）。

---

## 🧱 UI 架構

### ✨ 頁面區塊
- **Header區**
  - 標題：今天吃什麼？
  - 副標：抽一張牌，交給命運吧！

- **抽籤卡片區**
  - 單一大卡片居中（可用卡片翻面動畫）
  - 正面：神秘圖案（如問號、占卜符號、便當圖示）
  - 背面：吃的結果（餐點名稱 + 可愛圖案 + 按鈕連結如「Google 店家」）

- **重新抽卡按鈕**
  - 抽完可重新抽一次

---

## 🖼️ UI 設計風格建議

### 風格主題：**占卜系可愛風 or 神祕塔羅風**
- **背景顏色**：漸層（ex. 淺紫～粉橘）或深藍夜空感
- **卡片設計**：
  - 正面：有發光邊框 + 神祕圖騰/emoji
  - 背面：美食插畫 + 餐點名稱 + 小建議
- **字型**：手寫風或圓體字型（例如 Noto Sans TC Rounded）

---

## 🧩 互動設計

### 翻牌動效
使用 CSS 3D flip 效果：
```css
.card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.card.flipped {
  transform: rotateY(180deg);
}
```

---

## 🎲 食物類型資料範例（可隨機抽）

```js
const foodOptions = [
  { name: "拉麵", img: "ramen.png" },
  { name: "火鍋", img: "hotpot.png" },
  { name: "便當", img: "bento.png" },
  { name: "滷肉飯", img: "lu-rou.png" },
  { name: "喝水減肥", img: "water.png" },
];
```

---

## 🎨 補充視覺風格建議

| 元素        | 建議樣式                         |
|-------------|----------------------------------|
| 卡片尺寸    | 300px x 400px，圓角 16px          |
| 卡片陰影    | `box-shadow: 0 4px 16px rgba()`   |
| 顏色配色    | 主色：#FEC5BB、#D8E2DC、#FFB5A7   |
| 動畫        | 進場時輕微浮動 + 點擊翻面動畫     |
| 音效（選配）| 翻牌音、成功抽中音效增加趣味性   |

---

## 網站技術
- **前端**：
  - HTML5 + CSS3 + JavaScript
  - CSS 變數管理色彩系統
  - 確保頁面佈局能適應所有設備尺寸（響應式設計）
  - 在整個應用程式中維持一致的設計模式
  - 使用cdn載入外部資源
- **不使用後端技術**
  - 使用純前端技術實現所有功能
- **檔案結構**：
  - `index.html`：主頁面
  - `style.css`：樣式表
  - `script.js`：JavaScript 功能
  - `assets/`：圖片、影片、字體等資源文件夾

---

## HTML Best Practices
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Ensure proper accessibility with ARIA attributes where needed
- Keep the DOM structure clean and minimal
- Use appropriate heading hierarchy (h1-h6)

---

## VanillaJS Implementation
- Write modular JavaScript functions
- Minimize DOM manipulations by batching changes
- Use event delegation for better performance
- Implement progressive enhancement principles
- Prefer modern ES6+ syntax and features
