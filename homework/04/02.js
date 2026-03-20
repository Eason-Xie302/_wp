function sumArray(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

const numList = [10, 20, 30, 40];
console.log(sumArray(numList)); // 輸出：100