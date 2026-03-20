const usersJson = '[{"name":"小華","age":16},{"name":"阿傑","age":22},{"name":"美美","age":18}]';

// 解析 JSON 字串成陣列物件
const users = JSON.parse(usersJson);

for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    console.log(users[i].name + " 是成年人。");
  }
}