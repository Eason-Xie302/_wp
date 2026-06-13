const prices = [100, 200, 300, 400];

// 使用 map 產生新陣列，並用單行箭頭函數打 8 折 (* 0.8)
const discountedPrices = prices.map(price => price * 0.8);

console.log(discountedPrices); 
// 輸出: [ 80, 160, 240, 320 ]