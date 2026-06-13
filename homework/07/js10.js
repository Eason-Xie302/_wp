function checkAdmin(role, callback) {
  if (role !== "admin") {
    // 發生錯誤：第一個參數傳入錯誤訊息
    callback("Access Denied"); 
  } else {
    // 成功：第一個參數傳 null，第二個參數傳成功訊息
    callback(null, "Welcome"); 
  }
}

// 測試：失敗狀況
checkAdmin("user", (err, msg) => {
  if (err) {
    console.log("驗證失敗：", err); // 輸出: 驗證失敗： Access Denied
  } else {
    console.log("驗證成功：", msg);
  }
});

// 測試：成功狀況
checkAdmin("admin", (err, msg) => {
  if (err) {
    console.log("驗證失敗：", err);
  } else {
    console.log("驗證成功：", msg); // 輸出: 驗證成功： Welcome
  }
});