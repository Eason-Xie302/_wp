## 習題 4

AI 問答 -- https://gemini.google.com/share/f6957dc97c02

## 我的測試結果

--- 執行 01.js ---
小明 及格了！
--- 執行 02.js ---
100
--- 執行 03.js ---
找到了！在索引值 3 的位置。
--- 執行 04.js ---
阿傑 是成年人。
美美 是成年人。
--- 執行 05.js ---
{ name: '勇者', role: '劍士', level: 99 }
--- 執行 06.js ---
[
  { item: '滑鼠', price: 400 },
  { item: '鍵盤', price: 900, isDiscounted: true }
]
--- 執行 07.js ---
{ remainingMoney: 0, wins: 2 }
--- 執行 08.js ---
{"volume":80,"language":"zh-TW","theme":"dark","lastUpdated":"2026-03-20T03:45:46.235Z"}
--- 執行 09.js ---
{ name: 'Beta', score: 2200 }
--- 執行 10.js ---
{ totalItemsProcessed: 2, totalValue: 900 }

## 摘要

這是一份為你量身打造的 10 個 JavaScript 程式練習題！這些題目由淺入深，並且涵蓋了你所要求的 `if`、`for`、`while`、`function`、`json`、`array` 與 `object` 觀念。

每個練習都包含了**題目敘述**、**主要練習觀念**以及**參考解答**，建議你可以先嘗試自己寫寫看，再對照解答！

---

### 1. 成績及格判斷
**題目：** 寫一個函式，接收一個包含學生名字與分數的「物件」，並使用 `if` 判斷分數是否及格（大於等於 60 分），回傳對應的字串。
* **練習觀念：** `function`, `object`, `if`

```javascript
function checkPass(student) {
  if (student.score >= 60) {
    return student.name + " 及格了！";
  } else {
    return student.name + " 不及格，請繼續努力。";
  }
}

const myStudent = { name: "小明", score: 75 };
console.log(checkPass(myStudent)); // 輸出：小明 及格了！
```

### 2. 計算陣列總和
**題目：** 寫一個函式，接收一個數字「陣列」，使用 `for` 迴圈將裡面所有的數字加總起來並回傳。
* **練習觀念：** `function`, `array`, `for`

```javascript
function sumArray(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

const numList = [10, 20, 30, 40];
console.log(sumArray(numList)); // 輸出：100
```

### 3. 尋找特定的幸運數字
**題目：** 使用 `while` 迴圈在一個陣列中尋找特定的數字（例如 7）。如果找到了，印出「找到了！」，並立刻停止迴圈；如果找完都沒有，則印出「沒找到」。
* **練習觀念：** `while`, `array`, `if`

```javascript
const boxOfNumbers = [3, 9, 12, 7, 24, 8];
let i = 0;
let found = false;

while (i < boxOfNumbers.length) {
  if (boxOfNumbers[i] === 7) {
    console.log("找到了！在索引值 " + i + " 的位置。");
    found = true;
    break; // 找到就提早結束迴圈
  }
  i++;
}

if (!found) {
  console.log("沒找到幸運數字 7。");
}
```

### 4. 解析 JSON 並篩選成年人
**題目：** 給定一個包含使用者資料的 JSON 字串。請先將其解析為 JavaScript 陣列物件，然後使用 `for` 迴圈與 `if` 判斷，將年齡大於等於 18 歲的人印出來。
* **練習觀念：** `json`, `array`, `object`, `for`, `if`

```javascript
const usersJson = '[{"name":"小華","age":16},{"name":"阿傑","age":22},{"name":"美美","age":18}]';

// 解析 JSON 字串成陣列物件
const users = JSON.parse(usersJson);

for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    console.log(users[i].name + " 是成年人。");
  }
}
```

### 5. 陣列組合為物件
**題目：** 寫一個函式，接收兩個陣列（一個是 key，一個是 value），使用 `for` 迴圈將它們對應合併成一個「物件」並回傳。
* **練習觀念：** `function`, `array`, `object`, `for`

```javascript
function createObject(keys, values) {
  let resultObj = {};
  for (let i = 0; i < keys.length; i++) {
    // 假設兩個陣列長度一樣
    resultObj[keys[i]] = values[i];
  }
  return resultObj;
}

const keysArray = ["name", "role", "level"];
const valuesArray = ["勇者", "劍士", 99];
console.log(createObject(keysArray, valuesArray)); 
// 輸出：{ name: '勇者', role: '劍士', level: 99 }
```

### 6. 商品打折處理器
**題目：** 有一個陣列裡面裝滿了商品物件。請寫一個函式，使用 `for` 迴圈檢查每個商品，如果價格超過 500 元，就將該物件增加一個 `isDiscounted: true` 的屬性，並把價格打 9 折。
* **練習觀念：** `function`, `array`, `object`, `for`, `if`

```javascript
function applyDiscount(products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].price > 500) {
      products[i].price = products[i].price * 0.9;
      products[i].isDiscounted = true;
    }
  }
  return products;
}

const cart = [
  { item: "滑鼠", price: 400 },
  { item: "鍵盤", price: 1000 }
];
console.log(applyDiscount(cart));
// 輸出鍵盤的價格會變成 900，並多出 isDiscounted 屬性
```

### 7. 吃角子老虎機模擬 (抽獎直到破產)
**題目：** 寫一個函式模擬抽獎。你有初始資金（例如 100 元），每次抽獎花費 20 元。使用 `while` 迴圈，只要資金還夠就一直抽，並在迴圈內使用 `if` 模擬中獎機率（可使用 `Math.random()`），最後回傳剩餘金額與中獎次數物件。
* **練習觀念：** `function`, `while`, `if`, `object`

```javascript
function playGacha(money) {
  let cost = 20;
  let winCount = 0;
  
  while (money >= cost) {
    money -= cost; // 扣除花費
    // 假設有 30% 機率中獎
    if (Math.random() < 0.3) {
      winCount++;
    }
  }
  
  return { remainingMoney: money, wins: winCount };
}

console.log(playGacha(100)); // 輸出範例：{ remainingMoney: 0, wins: 1 }
```

### 8. 更新資料並輸出 JSON 字串
**題目：** 寫一個函式，接收一個設定檔物件，使用 `if` 檢查是否缺少 `theme`（主題）屬性，如果沒有就預設為 `dark`。最後將整理好的物件轉回 JSON 字串回傳。
* **練習觀念：** `function`, `object`, `if`, `json`

```javascript
function prepareConfig(configObj) {
  if (!configObj.theme) {
    configObj.theme = "dark"; // 補上預設值
  }
  configObj.lastUpdated = new Date().toISOString();
  
  // 轉為 JSON 字串
  return JSON.stringify(configObj);
}

const mySettings = { volume: 80, language: "zh-TW" };
console.log(prepareConfig(mySettings));
// 輸出一段包含 theme 與 lastUpdated 的 JSON 字串
```

### 9. 找出最高分的玩家
**題目：** 給定一個包含玩家物件的陣列。使用 `for` 迴圈與 `if` 判斷式，找出分數最高的那一位玩家，並回傳該玩家的物件。
* **練習觀念：** `array`, `object`, `for`, `if`, `function`

```javascript
function findTopPlayer(players) {
  let topPlayer = players[0]; // 先假設第一個是最高分
  
  for (let i = 1; i < players.length; i++) {
    if (players[i].score > topPlayer.score) {
      topPlayer = players[i]; // 替換成更高分的玩家
    }
  }
  return topPlayer;
}

const gamerList = [
  { name: "Alpha", score: 1500 },
  { name: "Beta", score: 2200 },
  { name: "Gamma", score: 1800 }
];
console.log(findTopPlayer(gamerList)); // 輸出：{ name: 'Beta', score: 2200 }
```

### 10. 綜合挑戰：處理進貨清單 (結合所有觀念)
**題目：** 你收到一個 JSON 字串，裡面是一個包含多個商品庫存物件的陣列。
1. 將 JSON 轉為陣列物件。
2. 寫一個 `while` 迴圈，每次處理陣列中的**最後一個**商品（可使用 `pop()`），直到陣列清空。
3. 處理時，使用 `if` 判斷商品庫存是否為 0。如果不為 0，計算總價值（價格 * 數量）並存入一個統計物件中。
* **練習觀念：** `json`, `array`, `object`, `while`, `if`, `function`

```javascript
function processInventory(jsonString) {
  // 1. JSON 解析為 Array 包含 Object
  const inventory = JSON.parse(jsonString);
  const summary = { totalItemsProcessed: 0, totalValue: 0 };
  
  // 2. 使用 while 迴圈處理陣列
  while (inventory.length > 0) {
    let item = inventory.pop(); // 取出最後一項
    
    // 3. if 判斷
    if (item.stock > 0) {
      summary.totalValue += (item.price * item.stock);
      summary.totalItemsProcessed++;
    }
  }
  
  return summary;
}

const inventoryData = '[{"id":1,"price":100,"stock":5},{"id":2,"price":50,"stock":0},{"id":3,"price":200,"stock":2}]';
console.log(processInventory(inventoryData)); 
// 輸出：{ totalItemsProcessed: 2, totalValue: 900 }
```

---

建議你可以把這些程式碼複製到瀏覽器的開發者工具（F12 -> Console）或是 CodePen 裡面實際跑跑看，甚至試著修改裡面的變數或條件來觀察結果。

請問你需要我針對這其中的某個特定觀念（例如 JSON 與物件的轉換，或是迴圈的運作方式）做更深入的解釋嗎？