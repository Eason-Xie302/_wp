function multiplier(factor) {
  // 回傳一個接收參數 n 的箭頭函數
  return (n) => n * factor;
}

const double = multiplier(2);
console.log(double(10)); // 預期輸出: 20