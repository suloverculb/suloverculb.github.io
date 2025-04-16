# Digital Notebook 頁面架構與設計風格指南

---

## 一、頁面架構

### 1. 導覽與頁籤區域
- **標題區塊**  
  - 「My Digital Notebook」主標題  
  - 歡迎與描述性短語
- **頁籤分類 (Tabs)**  
  - Notes（筆記內容）  
  - Tasks（待辦任務）  
  - Ideas（靈感想法）

### 2. 筆記主內容區域
- **Recent Notes**：最近新增的筆記摘要與日期
- **Todo List**：任務項目與核選方塊，已完成任務加上劃線效果
- **Quick Notes**：快速提醒或摘要筆記

### 3. 操作按鈕區域
- 右下角浮動操作按鈕  
  - 編輯（鉛筆圖示）  
  - 刷新（圓圈箭頭圖示）  
  - 新增（加號圖示）

---

## 二、設計風格指南

### 色彩規範
- **背景主色調**：`#FFFBF2`（柔和暖白色）
- **文字主色調**：`#333333`（深灰黑色）
- **標題與特殊文字**：`#1F4E79`（深藍色）
- **已完成項目**：`#AAAAAA`（中性灰色）
- **互動元素強調色**：`#D9534F`（柔和紅色）

### 字型規範
- **標題與頁籤字型**：`'Shadows Into Light', cursive`（手寫風格）
- **內文字型**：`'Patrick Hand', cursive`（清晰手寫）
- **中文字型**：請使用LXGW WenKai TC

### 間距與布局
- **內容最大寬度**：800px
- **邊界內縮間距（Padding）**：20px
- **區塊間垂直間距**：24px
- **頁籤與內容間距**：16px

---
## 視覺元素：

### 背景與材質：
- 使用淺黃色的仿紙張背景，帶有橫線與左側紅色垂直邊線，模擬現實中的活頁紙或筆記本紙張，增加真實感。
- 請使用css做出背景圖案，並確保背景圖案在不同解析度下不會失真或重複。
### 文字效果：
- 採用手寫字體與鋼筆、原子筆書寫風格，營造個性化筆記的親密感受，強化使用者與筆記內容的情感連結。
- 已完成任務使用灰色劃線效果模擬真實畫線效果，表達任務完成的視覺效果。
### 頁籤設計：
- 右上角的三個頁籤（Notes, Tasks, Ideas）使用突出設計，模擬真實筆記本的索引標籤，使得分類與切換更加直覺。
- 頁籤圖示風格簡單明瞭，並特意加入紅色標籤與書籤圖示，提升視覺辨識度。

## 布局
- 內容區域的間距寬鬆，避免資訊過於密集，符合真實紙本筆記的書寫習慣。
---

## 網站技術
- **前端**：
  - HTML5 + CSS3 + JavaScript
  - CSS 變數管理色彩系統
  - 確保頁面佈局能適應所有設備尺寸（響應式設計）
  - 在整個應用程式中維持一致的設計模式
  - 使用cdn載入外部資源
  - 使用fontawesome載入圖示
  - 使用Google Fonts載入字型
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
