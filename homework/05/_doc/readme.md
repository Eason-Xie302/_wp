# 習題 5：Blog 系統開發與版本演進紀錄
---

## 🚀 版本演進與功能實作

### 📦 [blog1] 基礎網誌系統原型 (純文字測試版)
**目標：建立可運作的後端基礎架構與資料庫連線**
- **視覺狀態**：系統雛形，無任何 CSS 樣式介入，呈現最原始的 HTML 條列式結構。
- **後端實作**：
  - 使用 `express` 作為 Web 框架建立伺服器。
  - 使用 `sql.js` 作為 SQLite 資料庫（因 better-sqlite3 需環境編譯，故選用此輕量方案）。
  - 使用 `ejs` 作為模板引擎渲染畫面。
  - 建立基本的 CRUD 功能（發表、閱讀、刪除文章）。
  - 實作自動建立 `blog.db` 資料庫檔案機制。
  - 建立 `.gitignore` 確實過濾 `node_modules` 與資料庫等不需版控的檔案。

### 📦 [blog2] 會員系統與進階排版 (亮色系卡片版)
**目標：加入權限控制系統與現代化網頁排版**
- **視覺狀態**：加入基礎 CSS 排版，採用藍白亮色系主題，並將文章包裝為獨立卡片（Card）樣式，加入頂部導覽列。
- **功能實作**：
  - 安裝 `marked` 套件支援 Markdown 語法渲染。
  - 安裝 `express-session` 實作 Session 狀態管理。
  - 建立 `users` 資料表，專門儲存用戶帳號與密碼。
  - 實作 `/register`、`/login`、`/logout` 完整會員路由。
  - 加入權限控制：區分「訪客」與「會員」，登入後才能看見發表與刪除文章的按鈕。
- **Debug 紀錄**：
  - **問題**：開發過程中 `index.ejs` 曾報錯 `loggedIn is not defined`。
  - **解法**：實作 `res.locals` 中介層 (Middleware)，讓所有 EJS 頁面自動取得 `loggedIn` 和 `user` 全域變數，移除每個路由手動傳遞的冗餘程式碼。

### 📦 [blog3] Threads 風格終極版 (深色模式與動線分離)
**目標：現代化 UI 設計重構與使用者體驗 (UX) 優化**
- **視覺狀態**：全面採用深色模式（Dark Mode），無邊框沉浸式體驗，並加入漸層頭像。
- **功能實作**：
  - **UI 大改版**：改為三欄式佈局（左側導航、中央貼文、右側個人資訊），高度還原 Threads 視覺風格。
  - **動線與路由分離**：
    - `/` - 公共貼文區（所有人可見的全球大廳）。
    - `/my-posts` - 我的貼文區（私人管理後台，需登入）。
    - `/user/:username` - 其他用戶的專屬個人頁面。
  - **模板重構**：為配合動線分離，建立獨立的 `my-posts.ejs` 和 `user-profile.ejs` 視圖模板。

---

## 📂 專案檔案結構 (以 blog3 為例)

```text
blog3/
├── server.js           # 主伺服器檔案 (路由與資料庫邏輯)
├── package.json        # 專案依賴套件設定檔
├── .gitignore          # Git 忽略清單
├── blog.db             # SQLite 資料庫 (系統自動生成)
└── views/
    ├── index.ejs       # 公共貼文首頁
    ├── my-posts.ejs    # 我的貼文頁面
    ├── user-profile.ejs# 用戶個人頁面
    ├── post.ejs        # 貼文詳情頁面
    ├── new.ejs         # 發布新貼文頁面
    ├── login.ejs       # 登入頁面
    └── register.ejs    # 註冊頁面