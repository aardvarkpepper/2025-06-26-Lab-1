// const productNameInput = document.getElementById('product-name'); // <input type="text" id="product-name" placeholder="Product Name">
// const productPriceInput = document.getElementById('product-price');  //  <input type="number" id="product-price" placeholder="Product Price">
// const addProductButton = document.getElementById('add-product'); // <button id="add-product">Add Product</button>
// const cart = document.getElementById('cart'); //  <ul id="cart"></ul>
// const totalPriceSpan = document.getElementById('total-price'); //<h3>Total: $<span id="total-price">0</span></h3>
 
// let totalPrice = 0;

const Product = class {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const ShoppingCart = class {
  constructor() {
    this.items = [];
  }
  addProduct(product) {
    let productFound = this.items.find((element) => element.product === product.name);
    if (!productFound) {
      this.items.push({product: product.name, quantity: 1});
    } else {
      productFound.quantity++;
    }
  }
  removeProduct(product) {
    let productIndex = this.items.findIndex((element) => element.product === product.name); // -1 if not found, but this should always be found.
    // console.log(`productIndex ${productIndex},item ${this.items[productIndex]}`);
    if (this.items[productIndex].quantity > 1) {
      this.items[productIndex].quantity--;
    } else {
      this.items.splice(productIndex, 1);
    }
  }
  displayItemsToScreen() {

  }
}

// const testSuite = () => {
//   let prod1 = new Product ("ham", 35);
//   let prod2 = new Product ("turkey", 45);
//   let prod3 = new Product ("oyster", 44);
//   let newBag = new ShoppingCart();
//   newBag.addProduct(prod3);
//   newBag.addProduct(prod1);
//   newBag.addProduct(prod1);
//   newBag.addProduct(prod2);
//   console.log(JSON.stringify(newBag.items));
//   newBag.removeProduct(prod1);
//   console.log(JSON.stringify(newBag.items));
//   newBag.removeProduct(prod1);
//   console.log(JSON.stringify(newBag.items));
// }

// testSuite();

// addProductButton.addEventListener('click', (event) => {
//   const productName = productNameInput.value;
//   const productPrice = productPriceInput.value;
  
// });

// cart.addEventListener('click', (event) => {
//   if (event.target.classList.contains('button-remove-product')) {
//     const productLi = event.target.closest('li');
//     cart.removeChild(productLi);
//   }
// })
 
// // Function to update the total price
// function updateTotalPrice(amount) {
//   totalPrice += amount;
//   totalPriceSpan.textContent = totalPrice.toFixed(2);
// }
 
// // Function to remove an item
// function removeItem(event) {
//   const item = event.target.closest('li');
//   const price = parseFloat(item.dataset.price);
//   updateTotalPrice(-price);
//   item.remove();
// }