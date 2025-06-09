# 日幣換算台幣的網頁應用程式
## 概述
這是一個簡單的網頁應用程式，用於將日幣（JPY）轉換為台幣（TWD）。使用者可以輸入日幣金額，然後點擊按鈕進行轉換。
## 功能
- 使用者可以輸入日幣金額
- 點擊按鈕後，顯示轉換後的台幣金額
- 轉換匯率要能及時更新
- 使用者可以清除輸入欄位和結果顯示
- 提供簡單的使用說明和提示

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
