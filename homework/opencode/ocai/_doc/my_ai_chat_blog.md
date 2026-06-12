# Blog 系統開發紀錄

## 功能需求與實作

### 1. 基礎 Node.js + SQLite 網誌系統
- **要求**：使用 Node.js + SQLite 寫一個簡易的網誌系統
- **實作**：
  - 使用 `express` 作為 Web 框架
  - 使用 `sql.js` 作為 SQLite 資料庫（因為 better-sqlite3 需要編譯）
  - 使用 `ejs` 作為模板引擎
  - 建立基本的 CRUD 功能（發表、閱讀、刪除文章）
  - 自動建立 `blog.db` 資料庫檔案

### 2. Markdown 支援與用戶系統
- **要求**：使用 marked 支援 Markdown，並加入用戶註冊、登入、登出功能
- **實作**：
  - 安裝 `marked` 套件支援 Markdown 渲染
  - 安裝 `express-session` 管理 Session
  - 建立 `users` 資料表儲存用戶帳號密碼
  - 實作 `/register`、`/login`、`/logout` 路由
  - 加入權限控制：登入後才能發表/刪除文章

### 3. 修復 loggedIn 變數問題
- **問題**：`index.ejs` 報錯 `loggedIn is not defined`
- **要求**：確保所有 `res.render` 都有傳入 loggedIn 變數
- **實作**：
  - 使用 `res.locals` 中介層，讓所有頁面自動取得 `loggedIn` 和 `user` 變數
  - 移除每個路由手動傳入這些變數的程式碼

### 4. Threads 風格美術設計
- **要求**：修改成像 Threads.com 那樣的風格，包含個人貼文區和公共貼文區
- **實作**：
  - 深色模式（黑色背景）
  - 三欄式佈局（左側導航、中央貼文、右側個人資訊）
  - 漸層紫色頭像設計
  - 圓角卡片設計
  - 重新設計所有頁面模板（index、post、new、login、register）

### 5. 公共與私人貼文區分開
- **要求**：公共區和私人區用不同網址分開，不需要放在同一個畫面
- **實作**：
  - `/` - 公共貼文區（所有人可見）
  - `/my-posts` - 我的貼文區（需登入）
  - `/user/:username` - 其他用戶個人頁面
- **實作**：
  - 側邊欄加入「公共貼文」和「我的貼文」連結
  - 點擊發文者的帳號連結可進入該用戶的個人頁面
  - 建立獨立的 `my-posts.ejs` 和 `user-profile.ejs` 模板

### 6. Git 忽略檔案
- **要求**：建立 .gitignore，過濾 node_modules、package-lock.json、yarn.lock、blog.db
- **實作**：建立 `.gitignore` 檔案

---

## 檔案結構

```
ocai/
├── server.js           # 主伺服器檔案
├── package.json        # 專案依賴設定
├── .gitignore          # Git 忽略檔案
├── blog.db             # SQLite 資料庫（已忽略）
├── _doc/
│   └── my_ai_chat_blog.md  # 本紀錄檔案
└── views/
    ├── index.ejs       # 公共貼文首頁
    ├── my-posts.ejs    # 我的貼文頁面
    ├── user-profile.ejs # 用戶個人頁面
    ├── post.ejs        # 貼文詳情頁面
    ├── new.ejs         # 發布新貼文頁面
    ├── login.ejs       # 登入頁面
    └── register.ejs    # 註冊頁面
```

---

## 安裝與執行

```bash
cd ocai
npm install
npm start
```

伺服器啟動於：http://localhost:3000
