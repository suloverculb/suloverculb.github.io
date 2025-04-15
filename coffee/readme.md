# CAFÉ À JOUR（光之日咖啡）  
_一個溫柔灑落陽光的所在，讓心慢下來，與香氣共處。_

---

## 📌 網站架構與內容構思

### 1. Hero Banner區｜全幅照片+Logo+Slogan

**背景建議**：  
- 手沖咖啡、木桌早午餐、日光灑落的窗邊場景。(hero-bg.png)

**中央Logo**：  
- 圓形手繪風徽章風格，含咖啡杯、葉子、太陽圖案。(logo.png)

**Slogan 文案**：
> 「享受每一道光，啜飲每一口生活。」

---

### 2. 主選單區｜簡潔功能導覽

- 關於我們  
- 菜單一覽  
- 最新消息  
- 預約資訊  
- 聯絡我們  

_建議字型：細明體或圓體，全部小寫設計風格_

---

### 3. 分類導覽區｜主題分類圖示

使用圓形小插畫icon呈現：

- ☕ 咖啡飲品  
- 🍳 早午餐  
- 🍰 手作甜點  
- 🪴 店內角落  
- 📷 顧客分享  

**文案提示**：  
> 「依你的心情，挑一個主題探索吧。」

---

### 4. 店內推薦區｜主打項目精選

圖片模組建議：左圖右文，或水平排列三圖格。

#### 🔹 推薦項目展示範例：

- **山形鬆餅**  
  _「鬆軟與楓糖之間，是微甜的靜謐時光。」_

- **靜謐閱讀角**  
  _「陽光正好，一本書和一杯拿鐵足矣。」_

- **蜜香紅茶歐蕾**  
  _「微糖、微奶、多一點溫柔。」_

---

### 5. 資訊小區塊模組

- 📅 **本月活動**：分享即享優惠 / 限定甜點登場  
- 📌 **預約提醒**：周末建議提前預約，以免久候  
- 🕰️ **營業時間**：每日 9:00-18:00（每週三公休）  

---

### 6. Footer 區｜品牌理念與社群連結

#### 品牌理念：

> 「CAFÉ À JOUR，相信每個日常都值得被細細品味。  
> 我們用一杯杯手沖，記錄屬於你的節奏與光影。」

#### 社群連結建議：

- Instagram  
- Facebook  
- Line@

---

## 🎨 UI設計風格建議

| 項目 | 建議風格 |
|------|----------|
| 字體 | 英文：Playfair Display / Libre Baskerville ；中文：思源宋體、Noto Serif TC |
| 排版 | 留白感多、段落寬敞、行距寬鬆 |
| 特效 | 滑動淡入淡出、hover 放大圖片效果 |

---

# 🎨 CAFÉ À JOUR 色系設定指南

## ✅ 色系總覽

| 色彩層級     | 色彩名稱           | 色碼（Hex） | 說明與使用場景 |
|--------------|--------------------|-------------|----------------|
| 主色（Base） | 象牙白 Ivory       | `#F8F5F0`   | 整體背景用色，營造自然柔和感，減少視覺負擔 |
| 主色（深）   | 淺木棕 Birchwood   | `#BDAFA1`   | 用於標題文字、邊框、icon線條 |
| 輔助色       | 鼠尾草綠 Sage Green | `#C1CFC1`  | 分類icon背景、hover狀態底色、資訊框底色 |
| 輔助色       | 細霧灰 Mist Grey   | `#D9D9D6`   | 元件區隔線條、卡片背景淡層次 |
| 點綴色       | 霧粉橘 Blush Orange | `#F4C9A0`  | 呼叫行動按鈕（CTA）、限時活動標籤、hover點綴 |
| 點綴色       | 豆沙玫瑰 Dried Rose | `#C68A8A`  | 活動區主視覺、推薦商品標籤、標題裝飾線 |
| 字體色（主） | 柔炭黑 Charcoal    | `#44403C`   | 正文主要文字色，用於具可讀性要求的區塊 |
| 字體色（輕） | 霧白灰 Foggy Grey  | `#A8A29E`   | 輔助說明、時間標籤、footer文字 |

---

## 📌 應用建議範例

### 🔸 按鈕設計

- **主按鈕**  
  - 背景：`#F4C9A0`（霧粉橘）  
  - 文字：`#44403C`（柔炭黑）

- **副按鈕**  
  - 邊框：`#BDAFA1`（淺木棕）  
  - 背景：透明  
  - hover 狀態：背景變成 `#F4C9A0`

---

### 🔸 Hero 區文字

- 標題字色：`#BDAFA1`（淺木棕）＋ Serif 字體  
- 副標語：`#A8A29E`（霧白灰）

---

### 🔸 分類 Icon 區

- icon 背景色：`#C1CFC1`（鼠尾草綠）  
- icon 線條色：`#44403C`（柔炭黑）

---

### 🔸 Footer 區塊

- 背景色：`#F8F5F0`（象牙白）  
- 文字色：`#A8A29E`（霧白灰）  
- 分隔線色：`#D9D9D6`（細霧灰）

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
