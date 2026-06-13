const users = [{name: "Alice", age: 25}, {name: "Bob", age: 17}];

// 篩選出 age >= 18 的物件
const adults = users.filter(user => user.age >= 18);

console.log(adults); 
// 輸出: [ { name: 'Alice', age: 25 } ]