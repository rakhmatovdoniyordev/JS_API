const productWrapper = document.querySelector(".product__wrapper")
const reviews = document.querySelector(".product__reviews")
const loading = document.querySelector(".loading")
const BASE__URL = "https://dummyjson.com";


async function getData(){
    let query = new URLSearchParams(window.location.search)
    let id = query.get("q")
    const response = await fetch(`${BASE__URL}/products/${id}`)
    response
        .json()
        .then(res =>  createContent(res))
        .catch(err => console.log(err))
        .finally(()=>{
            loading.style.display = "none"
        })
}
getData()

function createContent(data){
    const isoDate = `${data.meta.createdAt}`
    const date = new Date(isoDate)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const year = date.toLocaleDateString('en-GB', options);
    productWrapper.innerHTML = `
                    <div class="product__left">
                        <div class="product__title">
                            <h1>${data.title}</h1>
                        </div>
                        <div class="product__rating">
                            <div class="product__stars">${`<i class="fa-solid fa-star"></i>`.repeat(data.rating)}
                            ${`<i class="fa-regular fa-star"></i>`.repeat(5-Math.floor(data.rating))}</div>
                            <div class="product__rating__text">
                                <p>${data.rating}</p>
                                <p>( ${data.reviews.length} reviews )</p>
                            </div>
                        </div>
                        <div class="product__left__img">
                            <img src=${data.images[0]} alt="">
                        </div>
                        <div class="product__left__bottom-image">
                            ${data.images.map(i => `<img class="image__item" src=${i} alt="">`)}
                        </div>
                    </div>
                    <div class="product__right">
                        <div class="product__dimensions">
                            <p>Weight: ${data.weight}</p>
                            <p>width: ${data.dimensions.width}</p>
                            <p>Height: ${data.dimensions.height}</p>
                            <p>Depth: ${data.dimensions.depth}</p>
                        </div>
                        <div class="product__brand">
                            ${data.brand ? `<h1>${data.brand}</h1>` : ``}
                        </div>
                        <div class="product__price">
                            <p class="price">Price:${data.price} $ <span>Discount Percentage:${data.discountPercentage}$</span></p>
                            <p class="warranty">Warranty: ${data.warrantyInformation}</p>
                            <a href="#" class="like"><i class="fa-regular fa-heart"></i></a>
                            <button>Add To Cart</button>
                            <p class="status">Availability Status: ${data.availabilityStatus}</p>
                            <p class="stock">Stock: ${data.stock}</p>
                            <p class="minimum">Minimum Order Quantity: ${data.minimumOrderQuantity}</p>
                        </div>
                        <div class="prosuct__desc">
                            <h1>Description!</h1>
                            <p>${data.description}</p>
                        </div>
                        <div class="product__created">
                            <p>CreatedAt: ${year}</p>
                        </div>
                        <div class="product__qrcode">
                            <img src=${data.meta.qrCode} alt="">
                        </div>
                    </div>
    `

    data.reviews.forEach(item => {
        const isoDate = `${item.date}`
        const date = new Date(isoDate)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const year = date.toLocaleDateString('en-GB', options);
        const div = document.createElement("div")
        div.className = "product__item"
        div.innerHTML = `
            <h1>${item.reviewerName}</h1>
            <p class="date">${year}</p>
            <p class="comment"><span>Comment:</span> ${item.comment}</p>
            <div class="reviews__stars">
                ${`<i class="fa-solid fa-star"></i>`.repeat(item.rating)}
                ${`<i class="fa-regular fa-star"></i>`.repeat(5-item.rating)}
                <p>${item.rating}</p>
            </div>
        `
        reviews.appendChild(div)
    })
}