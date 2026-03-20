function createObject(keys, values) {
  let resultObj = {};
  for (let i = 0; i < keys.length; i++) {
    // 假設兩個陣列長度一樣
    resultObj[keys[i]] = values[i];
  }
  return resultObj;
}

const keysArray = ["name", "role", "level"];
const valuesArray = ["勇者", "劍士", 99];
console.log(createObject(keysArray, valuesArray)); 
// 輸出：{ name: '勇者', role: '劍士', level: 99 }