//shop script
let currentLoginUser = JSON.parse(localStorage.getItem('currentLoginUser'));

//auth check 
if (currentLoginUser) {
    let BASEURL = 'https://fakestoreapi.com';
    const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
    const colors = ['black', 'white', 'red', 'pink', 'blue'];

    //taking product details from local storage
    let productsDetails = JSON.parse(localStorage.getItem('productsDetails'));

    //if product details already in localstorage then this
    if (productsDetails) {
        
    }
    else {//productDetails=null
        fetchProducts(BASEURL)
            .then(data => {
                //passing reference to productsDetails means return item return the reference not making copy
                productsDetails = data.map((item) => {
                    item.colors = colors.slice(Math.floor(Math.random() * 5));
                    item.sizes = sizes.slice(Math.floor(Math.random() * 4));
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
    localStorage.setItem('menProducts',JSON.stringify(menProducts))
    localStorage.setItem('womensProducts',JSON.stringify(womensProducts))
    localStorage.setItem('electronicsProducts',JSON.stringify(electronicsProducts))
    localStorage.setItem('jeweleryProducts',JSON.stringify(jeweleryProducts))
}

function renAllProducts() {
    //render mens products
    renderMensProducts();
}


// this function will render all mens products
function renderMensProducts() {
    const productsContainer = document.querySelector('#productsContainer');
    productsContainer.innerHTML = "<h3>Men's Clothing</h3>";

    // taking all mens products data form local storage
    const menProducts=JSON.parse(localStorage.getItem('menProducts'))

    //displaying all mens products in card
    menProducts.forEach((product)=>{
        productsContainer.innerHTML+=`
        `
    })
    
    

}