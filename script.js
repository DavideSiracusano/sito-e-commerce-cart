let cartElement = document.getElementById("cart");
let cartItemsElement = document.getElementById("cart-items");
let productCatalogElement = document.getElementById("product-catalog");

const productCatalog = [
  { id: 1, name: "Iphone 13", price: 500, imageUrl: "./assets/iphone13.png" },
  { id: 2, name: "Samsung S22", price: 400, imageUrl: "./assets/s22.webp" },
  {
    id: 3,
    name: "Realme 10",
    price: 250,
    imageUrl: "./assets/Realme-10Pro-5G.png",
  },
];

const cart = [];

productCatalog.forEach((product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const productImageElement = document.createElement("img");
  productImageElement.src = product.imageUrl;
  productImageElement.alt = product.name;

  const productNameElement = document.createElement("h3");
  productNameElement.textContent = product.name;

  const productPriceElement = document.createElement("p");
  productPriceElement.textContent = `€ ${product.price}`;

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Aggiungi al carrello";

  addToCartButton.addEventListener("click", () => {
    cart.push(product);
    updateCart(); // aggiorna lo stesso div
  });

  productElement.append(
    productImageElement,
    productNameElement,
    productPriceElement,
    addToCartButton
  );
  productCatalogElement.appendChild(productElement);
});

function updateCart() {
  // Sovrascrive sempre il div
  if (cart.length === 0) {
    cartItemsElement.textContent = "Il carrello è vuoto";
  } else {
    let cartText = "Prodotti nel carrello: ";
    for (let i = 0; i < cart.length; i++) {
      cartText += cart[i].name;
      if (i < cart.length - 1) cartText += ", ";
    }
    cartText += ` | Totale: € ${subTotal()}`;
    cartItemsElement.textContent = cartText;
  }
}

function subTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
}
