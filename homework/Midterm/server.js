const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// 讓 Express 伺服器去讀取 public 資料夾裡面的靜態檔案 (你的遊戲)
app.use(express.static(path.join(__dirname, 'public')));

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 遊戲伺服器已啟動！`);
  console.log(`👉 請打開瀏覽器，輸入網址： http://localhost:${PORT}`);
});