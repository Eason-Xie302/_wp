const req = { body: { title: "JS教學", content: "內容在此", author: "Gemini" } };

// 一行程式碼解構：直接從 req.body 把 title 跟 content 抽出來變成獨立常數
const { title, content } = req.body;

console.log(title);   // 輸出: JS教學
console.log(content); // 輸出: 內容在此