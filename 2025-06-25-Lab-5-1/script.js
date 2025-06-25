const productNameInput = document.getElementById('product-name'); // <input type="text" id="product-name" placeholder="Product Name">
const productPriceInput = document.getElementById('product-price');  //  <input type="number" id="product-price" placeholder="Product Price">
const addProductButton = document.getElementById('add-product'); // <button id="add-product">Add Product</button>
const cart = document.getElementById('cart'); //  <ul id="cart"></ul>
const totalPriceSpan = document.getElementById('total-price'); //<h3>Total: $<span id="total-price">0</span></h3>
 
let totalPrice = 0;

/**
 * There ought to be a Catalog class that adds Products, maintaining unique IDs based on manufacturer, manufacturer origin, category, subcategory, classification, using alphanumerics for brevity and deliberately truncating for easier user reference, sorted for fast reference.
 */

// In fact, everything should be sorted for fast reference.  Look at all these naughty find and indexOf commands.  Eh.  Just let it go; if I do everything proper I'll be researching SQL injection attacks and doing things until forever.  Could write code to put in future assignments and build up a library but eh.  Best manually code for practice as I'm rusty.

const Product = class {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const ShoppingCart = class {
  constructor(lastId = 0) {
    this.items = [];
  }
  isNameEmpty(product) {
    if (product.name === "") {
      return true;
    }
    return false;
  }
  isPriceNegative(product) {
    if (product.price < 0) {
      return true;
    }
    return false;
  }
  isPriceDifferent(product) {
    const existingProduct = this.items.find((element) => element.product.name === product.name);
    console.log(existingProduct);
    if (!existingProduct) {
      return false;
    }
    if (existingProduct.product.price != product.price) {
      console.log(`iPD, ${existingProduct.product.price}, ${product.price}`);
      return true;
    }
    return false;
  }
  addProduct(product) {
    let errorString = "";
    let errorDetected = false;
    if (this.isNameEmpty(product)) {
      errorDetected = true;
      errorString += "Product name cannot be empty string."
    }
    if (this.isPriceNegative(product)) {
      errorDetected = true;
      if (errorString) {
        errorString += " ";
      }
      errorString += "Product price cannot be negative."
    }
    if (this.isPriceDifferent(product)) {
      errorDetected = true;
      if (errorString) {
        errorString += " ";
      }
      errorString += "Product has same name as existing product but different price.  Product prices must be same for items with same name."
    }
    if (errorDetected) {
      alert(errorString);
      return;
    }
    let productFound = this.items.find((element) => element.product.name === product.name);
    if (!productFound) {
      this.items.push({product: product, quantity: 1});
    } else {
      productFound.quantity++;
    }
  }
  removeProductByName(productName) {
    let productIndex = this.items.findIndex((element) => element.product.name === productName); // -1 if not found, but this should always be found.
    if (this.items[productIndex].quantity > 1) {
      this.items[productIndex].quantity--;
    } else {
      this.items.splice(productIndex, 1);
    }
  }
  displayItemsToScreen(elementHTML, filterFunction = null) {
    console.log("displayItemsToScreen");
    elementHTML.textContent = ""; // replaces all content, including HTML, inside the UL with "", effectively removing <li>s.
    const fragment = document.createDocumentFragment();
    console.log(`this.items${JSON.stringify(this.items)}`);
    for (let i = 0; i < this.items.length; i++) {
      const listItem = document.createElement('li');
      listItem.textContent = `${this.items[i].product.name}, $${Number(this.items[i].product.price).toFixed(2)}, quantity: ${this.items[i].quantity}`;
      listItem.setAttribute("name", `${this.items[i].product}`); // naughty HTML injection enabled, I suppose.
      const removeItemButton = document.createElement('button');
      removeItemButton.classList.add('button-remove-product'); // Correctly, I think encapsulation should pass in arguments from outside, or references should be internal.  I could be wrong on that.  Anyways, as it is, I have two choices I'm thinking of.  One is to do what is here, using ShoppingCart as a data abstraction that's called by other things, and that works with other things, though encapsulation isn't clean - if I understand encapsulation.  Another is to make the whole thing ShoppingCart methods, create a new shoppingCart, initialize shoppingCart.displayOrderForm() or similar.  Anyways.
      fragment.appendChild(listItem);
    }
    elementHTML.appendChild(fragment);
    this.displayCartTotal(totalPriceSpan);
  }
  // Iterating through the array is not strictly necessary.  Could put in something like a static variable, keep track of additions and subtractions.  Or put in summing in displayItemsToScreen.  Eh.
  // This is absolutely not too long of a line of code at all, it's easy to understand and maintain really!  wink wink
  displayCartTotal(htmlElement) {
    let initialValue = 0;
    htmlElement.textContent = `${Number(this.items.reduce((accumulator, currentElement) => accumulator + (currentElement.quantity * currentElement.product.price),initialValue,)).toFixed(2)}`
  }
}

const shoppingCart = new ShoppingCart();

addProductButton.addEventListener('click', (event) => {
  console.log("addProductButton");
  const productName = productNameInput.value;
  const productPrice = productPriceInput.value;
  let newProduct = new Product(productName, productPrice);
  shoppingCart.addProduct(newProduct);
  shoppingCart.displayItemsToScreen(cart);
  productName.value = "";
  productPrice.value = "";
  newProduct = null; // garbage collection yay
});

cart.addEventListener('click', (event) => {
  if (event.target.classList.contains('button-remove-product')) {
    const productLi = event.target.closest('li');
    shoppingCart.removeProductByName(productLi.name);
    cart.removeChild(productLi);
  }
})
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
 
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}