const wrapper = document.querySelector(".products__wrapper");
const loading = document.querySelector(".loading");
const moreBtn = document.querySelector(".products__btn");
const category = document.querySelector(".category__collection");

const BASE__URL = "https://dummyjson.com";
let limitcount = 8;
let offset = 1;

async function getData(endpoint, count) {
  const response = await fetch(`${BASE__URL}/${endpoint}?limit=${limitcount * count}`);
  response
    .json()
    .then((res) => createProduct(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}
getData("products", offset);

function createProduct(data) {
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
  data.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product__card";
    card.innerHTML = `
        <div class="product__img">
        <img src=${product.images[0]} alt="">
        <p class="product__brand">${product.brand}</p>
    </div>
    <div class="product__text">
        <h3>${product.title}</h3>
        <p class="product__desc">${product.description}</p>
        <div class="product__rating">
            <div class="product__stars">
                <a href="#"><i class="fa-solid fa-star"></i></a>
                <a href="#"><i class="fa-solid fa-star"></i></a>
                <a href="#"><i class="fa-solid fa-star"></i></a>
                <a href="#"><i class="fa-solid fa-star"></i></a>
                <a href="#"><i class="fa-solid fa-star"></i></a>
            </div>
            <p class="product__rating__p">${product.rating}</p>
        </div>
        <div class="product__information">
            <p class="product__weight">Weight: ${product.weight}</p>
            <p class="product__width">Width: ${product.dimensions.width}</p>
            <p class="product__height">Height: ${product.dimensions.height}</p>
            <p class="product__depth">Depth: ${product.dimensions.depth}</p>
        </div>
        <strong class="product__price">Price: ${product.price}$ <br> <span>Discount Percentage: ${product.discountPercentage}$</span></strong>
        <button>Add To Cart</button>
    </div>
        `;
        wrapper.appendChild(card)
  });
}


moreBtn.addEventListener("click", ()=>{
    offset++
    getData("products", offset);
})



async function getCategory(endpoint){
    const response = await fetch(`${BASE__URL}/${endpoint}`)
    response
        .json()
        .then(res => createCategory(res))
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = "none";
          });
}
getCategory("products/category-list")

function createCategory(data){
    data.forEach(item => {
        const li = document.createElement("li")
        const dataval = document.createElement("data")
        li.className = "category__item"
        dataval.innerHTML = item
        dataval.setAttribute("value", `/category/${item}`)
        dataval.addEventListener("click", e => {
            getData(`products${e.target.value}`, offset)
            loading.style.display = "flex";
        })
        li.appendChild(dataval)
        category.appendChild(li)
    })
}