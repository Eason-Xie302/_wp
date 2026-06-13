function calculateTotal(cart, discountFunc) {
  // 先將 cart 內的數字加總 (使用 reduce 技巧，或者用 for 迴圈也可以)
  const sum = cart.reduce((total, current) => total + current, 0);
  
  // 將總和丟進 discountFunc 處理，並回傳最終結果
  return discountFunc(sum);
}

// 測試：總共 600 元，扣除 50 元
const finalPrice = calculateTotal([100, 200, 300], total => total - 50);

console.log(finalPrice); // 輸出: 550