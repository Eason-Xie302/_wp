# 習題 7：全方位 JavaScript 實作挑戰 (後端邏輯與資料流深度解析)

本專案為理解 Express.js 與資料庫互動的核心實作演練。透過 10 個獨立的 JavaScript 模組，深度模擬並驗證了「資料如何從資料庫流向網頁」、「表單資料如何被後端接收與解構」以及「Node.js 中非同步 Error-First Callback 的運作機制」。

這份演練是看懂現代化 Node.js 網誌系統（如：Opencode 生成之 Blog 專案）的關鍵基礎。

---

## 🚀 核心學習目標與對應情境

本專案的 10 個實作題，皆精準對應到真實全端專案中的特定開發場景：

1. **資料讀取 (物件屬性存取)**
   - **實務場景**：理解 `post.title` 的運作，即後端從資料庫取得 Row Data 後的屬性存取操作。
2. **表單解析 (物件解構賦值)**
   - **實務場景**：對應 `app.post('/posts')` 中 `const { title, content } = req.body;` 的寫法，實現優雅的 Payload 解析。
3. **視圖渲染 (陣列遍歷與字串拼接)**
   - **實務場景**：對應首頁 `posts.forEach` 產生文章列表的底層邏輯。
4. **路由解析 (動態參數與字典)**
   - **實務場景**：模擬 Express Router 如何解析網址列參數並封裝成 `req.params.id` 字典物件。
5. **資料回傳 (錯誤優先回呼函數 Error-First Callback)**
   - **實務場景**：理解 `getPost(id, callback)` 的非同步設計，掌握資料如何透過 Callback 跨層傳遞。
6. **API 通訊 (JSON 處理)**
   - **實務場景**：理解 `app.use(express.json())` 中介層的底層行為，將 Client 端傳遞的字串反序列化（Deserialize）為物件。
7. **資料庫連線 (模擬 DB 查詢行為)**
   - **實務場景**：對應 `db.get(sql, params, callback)`，理解 SQL 指令注入後，等待資料庫回應並觸發回呼函數的完整生命週期。
8. **動態網頁 (樣板字串邏輯運算)**
   - **實務場景**：對應 EJS 樣板引擎或純端 Template Literals 生成動態 HTML DOM 的過程。
9. **資料清洗 (字串切片與陣列操作)**
   - **實務場景**：模擬 SQL 語法中的 `substr`，或前端進行長文截斷（Truncate）以優化版面顯示。
10. **權限控制 (Error-First Callback 實戰)**
    - **實務場景**：理解後端系統中無所不在的 `if (err) return ...` 錯誤處理與防禦性編程（Defensive Programming）模式。

---