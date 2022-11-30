const container = document.querySelector(".products__ul");
const button = document.querySelector(".products__button-gen");

const pageOne =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

(function cleanStorage() {
  window.localStorage.removeItem("nextPage");
})();

const savePage = (value) => window.localStorage.setItem("nextPage", value);

async function getData() {
  let page = window.localStorage.getItem("nextPage")?.replace("", "https://");
  const urlAtual = page ? page : pageOne;
  const promise = await fetch(urlAtual);
  const json = await promise.json();
  const { products, nextPage } = json;
  savePage(nextPage);
  fetchContent(products);
}

getData();

function fetchContent(p) {
  if (Array.isArray(p)) {
    p.map(({ image, name, description, oldPrice, price }) => {
      container.innerHTML += `
  <li class="cor-1 products__li">
  <img class="products__img" src="${image}" alt="${description}">
  <div class="products__li-list">
    <h3 class="font__p">${name}</h3>
    <p class="font__description products__description">${description}</p>
    <p class="font__description">De: R$${oldPrice},00</p>
    <p class="font__price">Por: R$${price}</p>
    <p class="font__description">ou 2x de R$${price / 2}</p>
    <button class="products__button cor-1">Comprar</button>
  </div>
  </li>
  `;
    });
  } else {
    throw "O retorno dessa promise não é uma array";
  }
}

button?.addEventListener("click", getData);
