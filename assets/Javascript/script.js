const URL = "https://dummyjson.com/products";
const productsElements = document.getElementById("products");

async function initialize () {
    const products = await getProducts();
    for (const product of products) {
        const productElement = document.createElement("div");
        productElement.className = "product"

        const imgProducts = document.createElement("img");
        imgProducts.src = product.thumbnail;
        imgProducts.className = "product-image";
        productElement.appendChild(imgProducts);

        const title = document.createElement("p");
        title.textContent = product.title;
        title.className = "title";
        productElement.appendChild(title);

        const prices = document.createElement("div");
        prices.className = "prices";
        const oldPrices = document.createElement("s");
        oldPrices.textContent = "$" + Math.round(product.price / (1-(product.discountPercentage / 100)));
        oldPrices.className = "old-price";
        prices.appendChild(oldPrices);
        const newPrices = document.createElement("p");
        newPrices.textContent = "$" + product.price;
        newPrices.className = "new-price";
        prices.appendChild(newPrices);

        productElement.appendChild(prices);

        productsElements.appendChild(productElement);
    }
}

async function getProducts() {
    const resp = await fetch(URL);
    const obj = await resp.json();
    return obj.products
}

initialize();