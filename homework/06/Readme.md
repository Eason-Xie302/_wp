# 習題 06：JavaScript 進階函式與陣列操作實作

本習題涵蓋了 JavaScript ES6 的核心概念實作，深入探討控制權反轉 (IoC)、詞法環境 (Lexical Environment)、閉包 (Closure) 以及非同步事件排程等底層機制。

---

## 📂 檔案結構與實作內容

為保持模組化與單一職責原則 (SRP)，10 道驗證題目已分別拆解為獨立的 `.js` 執行檔，可透過 Node.js 獨立執行與測試：

* **`js1.js`**：**控制權反轉與回呼機制 (Callback)**
  * 實作 `mathTool` 函數，將具體的「相加」與「相減」運算邏輯透過匿名函數動態注入，驗證高階函式與控制權反轉的概念。
  
* **`js2.js`**：**立即執行函式 (IIFE) 與詞法環境隔離**
  * 透過 IIFE 建立獨立的執行環境 (Execution Context)，封裝區域變數 `count`，徹底阻絕全域變數污染與外部存取。

* **`js3.js`**：**宣告式編程與資料映射 (Declarative Programming)**
  * 運用 `map` 陣列迭代器結合單行箭頭函數，實作無副作用的資料轉換（商品價格 8 折運算），回傳全新陣列。

* **`js4.js`**：**陣列變異操作 (Mutation) 與副作用 (Side Effects)**
  * 實作 `cleanData` 函數，使用 `pop` 與 `unshift` 對傳入的陣列參數進行破壞性修改，驗證陣列作為參考型別 (Reference Type) 的記憶體特性。

* **`js5.js`**：**高階函式 (HOF) 與閉包 (Closure) 記憶體保留**
  * 實作 `multiplier` 函式工廠 (Function Factory)，回傳的新函數將持續捕捉並記住其創建時的語法環境 (Lexical Scope) 中的 `factor` 變數。

* **`js6.js`**：**底層邏輯重構：自訂 Callback 篩選器**
  * 手寫原生 `myFilter` 邏輯，接收一個資料集與一個 Predicate (判斷式 Callback)，實踐條件篩選的動態委派。

* **`js7.js`**：**複合資料結構處理與一級函式 (First-Class Functions)**
  * 操作包含多個物件的陣列，結合 `filter` 與箭頭函數，精準提取符合特定屬性條件（`age >= 18`）的物件實例。

* **`js8.js`**：**記憶體陷阱：傳址 (Pass by Sharing) 與重新賦值**
  * 深入探討 JavaScript 參數傳遞機制，驗證直接操作記憶體 (`push`) 與對參數重新賦值 (Reassignment) 兩者在記憶體參照上的根本差異。

* **`js9.js`**：**非同步任務排程 (Asynchronous Scheduling)**
  * 運用 `setTimeout` 將 Callback 函式推入巨任務佇列 (Macrotask Queue)，驗證 JavaScript 事件迴圈 (Event Loop) 延遲執行的行為模型。

* **`js10.js`**：**資料聚合 (Aggregation) 與商業邏輯注入綜合應用**
  * 實作 `calculateTotal`，先處理陣列數值加總，再將結果狀態交由外部注入的 `discountFunc` Callback 進行最終業務邏輯處理（折扣計算）。

---
