function mathTool(num1, num2, action) {
  // 將 num1 和 num2 丟給傳進來的 action (回呼函數) 處理
  return action(num1, num2);
}

// 傳入相加的匿名函數
console.log(mathTool(10, 5, function(a, b) { return a + b; })); // 輸出: 15

// 傳入相減的匿名函數 (使用箭頭函數更簡潔)
console.log(mathTool(10, 5, (a, b) => a - b)); // 輸出: 5