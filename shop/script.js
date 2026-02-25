//shop script
let currentLoginUser = JSON.parse(localStorage.getItem('currentLoginUser'));

//auth check 
if (currentLoginUser) {
    let BASEURL = 'https://fakestoreapi.com';
    const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
    const colors = ['black', 'wheat', 'red', 'pink', 'blue'];

    //taking product details from local storage
    let productsDetails = JSON.parse(localStorage.getItem('productsDetails'));

    //if product details already in localstorage then this
    if (productsDetails) {
        renderAllProducts();
    }
    else {//productDetails=null
        fetchProducts(BASEURL)
            .then(data => {
                //passing reference to productsDetails means return item return the reference not making copy
                productsDetails = data.map((item) => {
                    if (item.category === "men's clothing"||item.category==="women's clothing") {
                        item.colors = colors.slice(Math.floor(Math.random() * 5));
                        item.sizes = sizes.slice(Math.floor(Math.random() * 4));
                    }
                    return item;
                });
                localStorage.setItem('productsDetails', JSON.stringify(productsDetails));
                filterProductsByCategory(productsDetails);

                // console.log('data',productsDetails);
            }).catch((err) => { console.log(`fetch Products api failed${err}`) });
    }


}
else {
    window.location.href = '/login/index.html'
}

//async function for data fetching form https://fakestoreapi.com/products
async function fetchProducts(url) {
    console.log('fetching products.....')
    try {
        let res = await fetch(`${url}/products`);
        if (!res.ok)
            throw new Error(`HTTP Error! Status: ${res.status}`)
        return res.json();
    } catch (e) {
        console.log(`Network issue Error: ${e.name}`);
        console.log(` Message:${e.message}`)
    } finally {
        console.log('completed')
    }
}

//this function will filter products by its category and store into local storage.
function filterProductsByCategory(productDetails) {

    const category = ["men's clothing", "women's clothing", "electronics", "jewelery"];
    const menProducts = productDetails.filter(item => item.category === "men's clothing")
    const womensProducts = productDetails.filter(item => item.category === "women's clothing");
    const electronicsProducts = productDetails.filter(item => item.category === "electronics");
    const jeweleryProducts = productDetails.filter(item => item.category === "jewelery");

    //placing all category data into localStorage.
    localStorage.setItem('menProducts', JSON.stringify(menProducts))
    localStorage.setItem('womensProducts', JSON.stringify(womensProducts))
    localStorage.setItem('electronicsProducts', JSON.stringify(electronicsProducts))
    localStorage.setItem('jeweleryProducts', JSON.stringify(jeweleryProducts))
}

function renderAllProducts() {
    //render all products
    renderMensProducts();
    renderWomensProducts();
    renderElectronicsProducts();
    renderJeweleryProducts();
}


// this function will render all mens products
function renderMensProducts() {
    const displayProductsContainer = document.querySelector('#displayProductsContainer');
    displayProductsContainer.innerHTML = "<h3 class='my-3'>Men's Clothing</h3>";

    // taking all mens products data form local storage
    const menProducts = JSON.parse(localStorage.getItem('menProducts'))

    // it will display all cards on shop
    clothingProductsCard(displayProductsContainer, menProducts);

}

// this function will render all womens products
function renderWomensProducts() {
    const displayProductsContainer = document.querySelector('#displayProductsContainer');
    displayProductsContainer.innerHTML += "<h3 class='my-3'>Women's Clothing</h3>";

    // taking all womens products data form local storage
    const womenProducts = JSON.parse(localStorage.getItem('womensProducts'))

    // it will display all cards on shop
    clothingProductsCard(displayProductsContainer, womenProducts);

}

// this function will render all electronics products
function renderElectronicsProducts() {
    const displayProductsContainer = document.querySelector('#displayProductsContainer');
    displayProductsContainer.innerHTML += "<h3 class='my-3'>Electronics</h3>";

    // taking all electronics products data form local storage
    const electronicsProducts = JSON.parse(localStorage.getItem('electronicsProducts'))

    // it will display all cards on shop
    nonClothingProductsCard(displayProductsContainer, electronicsProducts);

}

// this function will render all jewelery products
function renderJeweleryProducts() {
    const displayProductsContainer = document.querySelector('#displayProductsContainer');
    displayProductsContainer.innerHTML += "<h3 class='my-3'>Jewelery</h3>";

    // taking all jewelery products data form local storage
    const jeweleryProducts = JSON.parse(localStorage.getItem('jeweleryProducts'))

    // it will display all cards on shop
    nonClothingProductsCard(displayProductsContainer, jeweleryProducts);

}

//function for make clothing products cards (mens,women) and display 
function clothingProductsCard(container, products) {
    //container for hold all cards
    const productsContainer = document.createElement('div');
    productsContainer.setAttribute('class', 'd-flex flex-wrap gap-3')

    //displaying all products in card
    products.forEach((product) => {
        productsContainer.innerHTML += ` <div class="card" style="width: 220px;">
                    <img src=${product.image} width="100%"
                        class="card-img-top" 
                        height="200px"
                        alt="">
                    <div class="card-body">
                        <h6 class="card-title">${product.title}</h6>
                        <div class="d-flex justify-content-between">
                            <span class="card-text">₹${Math.floor(product.price * 10)}</span>
                            <span class="card-text">${product.sizes.join(',')}</span>
                        </div>
                        <div class="d-flex align-items-center  gap-1 ">
                            <span class="">Colors:</span>
                            ${product.colors.map(color=>{
                                return `<div class='color' style='background-color:${color}'></div>`
                            })}
                        </div>
                        <div>
                            <span>Rating:</span>
                            <span>&#9733 ${product.rating.rate}(${product.rating.count})</span>
                        </div>
                    </div>
                    <div class="card-footer d-grid">
                        <button class="btn btn-dark col">Add to Cart</button>
                        
                    </div>
                </div>
        `
    })

    //now put products into display products container
    container.appendChild(productsContainer)
}

//function for make products cards (electronic,jewelery) and display 
function nonClothingProductsCard(container, products) {
    //container for hold all cards
    const productsContainer = document.createElement('div');
    productsContainer.setAttribute('class', 'd-flex flex-wrap gap-3')

    //displaying all products in card
    products.forEach((product) => {
        productsContainer.innerHTML += ` <div class="card" style="width: 220px;">
                    <img src=${product.image} width="100%"
                        class="card-img-top" 
                        height="200px"
                        alt="">
                    <div class="card-body">
                        <h6 class="card-title">${product.title}</h6>
                        <div class="d-flex justify-content-between">
                            <span class="card-text">₹${Math.floor(product.price * 10)}</span>
                        </div>
                        <div>
                            <span>Rating:</span>
                             <span>&#9733 ${product.rating.rate}(${product.rating.count})</span>
                        </div>
                    </div>
                    <div class="card-footer d-grid">
                        <button class="btn btn-dark col">Add to Cart</button>
                        
                    </div>
                </div>
        `
    })

    //now put products into display products container
    container.appendChild(productsContainer)
}