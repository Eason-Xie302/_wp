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