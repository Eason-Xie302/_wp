function playGacha(money) {
  let cost = 20;
  let winCount = 0;
  
  while (money >= cost) {
    money -= cost; // 扣除花費
    // 假設有 30% 機率中獎
    if (Math.random() < 0.3) {
      winCount++;
    }
  }
  
  return { remainingMoney: money, wins: winCount };
}

console.log(playGacha(100)); // 輸出範例：{ remainingMoney: 0, wins: 1 }