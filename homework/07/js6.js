const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';

// 將字串轉回 JavaScript 物件
let obj = JSON.parse(jsonStr);

// 抓取 tags 陣列中的第二個元素 (索引值為 1)
console.log(obj.tags[1]); // 輸出: node