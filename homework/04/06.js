function applyDiscount(products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].price > 500) {
      products[i].price = products[i].price * 0.9;
      products[i].isDiscounted = true;
    }
  }
  return products;
}

const cart = [
  { item: "滑鼠", price: 400 },
  { item: "鍵盤", price: 1000 }
];
console.log(applyDiscount(cart));
// 輸出鍵盤的價格會變成 900，並多出 isDiscounted 屬性