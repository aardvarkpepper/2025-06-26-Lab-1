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
    let productFound = this.items.find((element) => element.product.name === product.name);
    if (!productFound) {
      this.items.push({product: product, quantity: 1});
    } else {
      productFound.quantity++;
    }
  }
  removeProduct(product) {
    let productIndex = this.items.findIndex((element) => element.product.name === product.name); // -1 if not found, but this should always be found.
    // console.log(`productIndex ${productIndex},item ${this.items[productIndex]}`);
    if (this.items[productIndex].quantity > 1) {
      this.items[productIndex].quantity--;
    } else {
      this.items.splice(productIndex, 1);
    }
  }
}

const testSuite = () => {
  let prod1 = new Product ("ham", 35);
  let prod2 = new Product ("turkey", 45);
  let prod3 = new Product ("oyster", 44);
  let newBag = new ShoppingCart();
  newBag.addProduct(prod3);
  newBag.addProduct(prod1);
  newBag.addProduct(prod1);
  newBag.addProduct(prod2);
  console.log(JSON.stringify(newBag.items));
  newBag.removeProduct(prod1);
  console.log(JSON.stringify(newBag.items));
  newBag.removeProduct(prod1);
  console.log(JSON.stringify(newBag.items));
}

testSuite();