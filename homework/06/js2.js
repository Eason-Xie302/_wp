(function() {
  let count = 100;
  console.log(`Count is: ${count}`);
})();

// 解釋：被 () 包起來的函數會立刻執行。
// 外部如果嘗試 console.log(count) 會報錯 (ReferenceError)，因為 count 是區域變數。