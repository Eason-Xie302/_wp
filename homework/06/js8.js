let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
  a.push(99); // 破壞性修改：直接修改記憶體裡的陣列
  b = [100];  // 重新賦值：把參數 b 指向一塊全新的記憶體，不影響外面的 listB
}

process(listA, listB);

console.log(listA); // 輸出: [1, 2, 99]
console.log(listB); // 輸出: [3, 4]