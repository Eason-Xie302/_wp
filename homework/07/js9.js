const arr = ["Very long content here", "Another Very long content here", "3rd Very long content here"];

// 用 map 處理陣列中每一筆字串，擷取前 10 個字元加上 "..."
const shortenedArr = arr.map(str => str.substring(0, 10) + "...");

console.log(shortenedArr);
// 輸出: [ 'Very long ...', 'Another Ve...', '3rd Very l...' ]