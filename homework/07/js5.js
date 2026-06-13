// 1. 定義函數
function fetchData(id, callback) {
  const fakeData = { id: id, status: "success" };
  // 第一個參數放 null 代表「沒有錯誤」，第二個參數放「成功拿到的資料」
  callback(null, fakeData);
}

// 2. 執行函數並處理結果
fetchData(101, (err, data) => {
  if (err) {
    console.log("發生錯誤：" + err);
  } else {
    console.log("成功取得資料：", data); 
    // 輸出: 成功取得資料： { id: 101, status: 'success' }
  }
});