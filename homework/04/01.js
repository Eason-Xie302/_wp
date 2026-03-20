function checkPass(student) {
  if (student.score >= 60) {
    return student.name + " 及格了！";
  } else {
    return student.name + " 不及格，請繼續努力。";
  }
}

const myStudent = { name: "小明", score: 75 };
console.log(checkPass(myStudent)); // 輸出：小明 及格了！