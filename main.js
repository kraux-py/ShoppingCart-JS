const openShopping = document.querySelector(".Shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const cartList = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "PRODUCT 1",
    image: "images/1.png",
    price: 100
  },
  {
    id: 2,
    name: "PRODUCT 2",
    image: "images/2.png",
    price: 100
  },
  {
    id: 3,
    name: "PRODUCT 3",
    image: "images/3.png",
    price: 100
  },
  {
    id: 4,
    name: "PRODUCT 4",
    image: "images/4.png",
    price: 100
  },
  {
    id: 5,
    name: "PRODUCT 5",
    image: "images/5.png",
    price: 100
  },
  {
    id: 6,
    name: "PRODUCT 6",
    image: "images/6.png",
    price: 100
  },
  
];

const initApp = () => {
  products.forEach((product) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");

    const productHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="title">${product.name}</div>
      <div class="price">$${product.price.toLocaleString()}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    newDiv.innerHTML = productHTML;
    list.appendChild(newDiv);
  });
};

initApp();

let cartItems = {};

const addToCart = (productId) => {
  
  const product = products.find((p) => p.id === productId);

  if (product) {
    
    const existingItem = cartItems[productId];

    if (existingItem) {
      existingItem.quantity++; 
    } else {
      cartItems[productId] = { ...product, quantity: 1 }; 
    }

    updateCart(); 
  } else {
    console.error("Product not found:", productId);
  }
};

const updateCart = () => {
  cartList.innerHTML = ""; 

  let totalPrice = 0;
  let totalQuantity = 0;

  Object.values(cartItems).forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;

    const newDiv = document.createElement("li");
    newDiv.innerHTML = `
      <div><img src="${item.image}" alt="${item.name}" /></div>
      <div class="cardTitle">${item.name}</div>
      <div class="cardPrice">$${item.price.toLocaleString()}</div>

      <div class="quantityControls">
        <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${item.id}, -1)">-</button>
        <span class="quantityValue">${item.quantity}</span>
        <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
    `;

    cartList.appendChild(newDiv);
  });

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = totalQuantity;
};



