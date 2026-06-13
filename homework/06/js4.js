function cleanData(arr) {
  arr.pop();          // 移除陣列的最後一個元素
  arr.unshift("Start"); // 在陣列最前面新增 "Start"
}

let myData = [1, 2, 3];
cleanData(myData);

console.log(myData); 
// 輸出: [ 'Start', 1, 2 ]
// 解釋：因為陣列是「傳址 (Pass by Reference)」，所以在函數內修改 arr，外面的 myData 也會跟著變。