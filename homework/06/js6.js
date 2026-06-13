function myFilter(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // 如果 callback 執行結果為 true，就丟進新陣列
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 測試：篩選大於 7 的數字
const testArr = [1, 5, 8, 12];
console.log(myFilter(testArr, n => n > 7)); 
// 輸出: [ 8, 12 ]