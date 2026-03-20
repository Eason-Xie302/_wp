function findTopPlayer(players) {
  let topPlayer = players[0]; // 先假設第一個是最高分
  
  for (let i = 1; i < players.length; i++) {
    if (players[i].score > topPlayer.score) {
      topPlayer = players[i]; // 替換成更高分的玩家
    }
  }
  return topPlayer;
}

const gamerList = [
  { name: "Alpha", score: 1500 },
  { name: "Beta", score: 2200 },
  { name: "Gamma", score: 1800 }
];
console.log(findTopPlayer(gamerList)); // 輸出：{ name: 'Beta', score: 2200 }