const boxOfNumbers = [3, 9, 12, 7, 24, 8];
let i = 0;
let found = false;

while (i < boxOfNumbers.length) {
  if (boxOfNumbers[i] === 7) {
    console.log("找到了！在索引值 " + i + " 的位置。");
    found = true;
    break; // 找到就提早結束迴圈
  }
  i++;
}

if (!found) {
  console.log("沒找到幸運數字 7。");
}