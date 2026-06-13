const posts = [{id: 1, t: "A"}, {id: 2, t: "B"}];
let html = "";

// 遍歷陣列，把每個物件的 t 屬性塞進 HTML 標籤裡拼接
posts.forEach(post => {
  html += `<div>${post.t}</div>\n`; 
});

console.log(html);
/* 輸出:
<div>A</div>
<div>B</div>
*/