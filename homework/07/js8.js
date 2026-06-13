let user = "Guest";

// 使用三元運算子 (條件 ? 成立結果 : 失敗結果) 判斷
let htmlString = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log(htmlString); // 輸出: <h1>Welcome, Guest</h1>