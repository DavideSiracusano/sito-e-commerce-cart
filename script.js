// manipolazione dom

let cartElement = document.getElementById("cart");
let cartItemsElement = document.getElementById("cart-items");
let productCatalogElement = document.getElementById("product-catalog");

// dati
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

// array carrello iniziale vuoto
const cart = [];

// ciclare sul catalogo prodotto creando elementi da appendere
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

  // event listenere per aggiungere un prodotto al carrello in base all'id
  addToCartButton.addEventListener("click", () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    console.log(cart);
    updateCart();
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
  // Svuota il carrello prima di ricostruirlo
  cartItemsElement.innerHTML = "";

  if (cart.length === 0) {
    cartItemsElement.textContent = "Il carrello è vuoto";
    return;
  }

  let total = 0;

  // Aggiunge i prodotti al carrello
  cart.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");
    productDiv.style.marginBottom = "5px";

    productDiv.textContent = `${product.name} - €${product.price} - Quantità: ${product.quantity}`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Rimuovi";
    removeButton.style.marginLeft = "10px";

    removeButton.addEventListener("click", () => {
      cart.splice(index, 1); // rimuove questo singolo prodotto
      updateCart(); // aggiorna il carrello
    });

    productDiv.appendChild(removeButton);
    cartItemsElement.appendChild(productDiv);

    // Calcola il totale
    total += product.price * product.quantity;
  });

  // Totale finale
  const totalDiv = document.createElement("div");
  totalDiv.style.marginTop = "10px";
  totalDiv.textContent = `Totale: €${total}`;
  cartItemsElement.appendChild(totalDiv);
}
