function prepareConfig(configObj) {
  if (!configObj.theme) {
    configObj.theme = "dark"; // 補上預設值
  }
  configObj.lastUpdated = new Date().toISOString();
  
  // 轉為 JSON 字串
  return JSON.stringify(configObj);
}

const mySettings = { volume: 80, language: "zh-TW" };
console.log(prepareConfig(mySettings));
// 輸出一段包含 theme 與 lastUpdated 的 JSON 字串