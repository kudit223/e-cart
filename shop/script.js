let currentLoginUser=JSON.parse(localStorage.getItem('currentLoginUser'));

if(currentLoginUser){
    let BASEURL='https://fakestoreapi.com';
    const sizes=['xs','s','m','l','xl','xxl'];
    const colors=['black','white','red','pink','blue']
    fetchProducts(BASEURL)
    .then(data=>{
        //passing reference to productsDetails means return item return the reference not making copy
        let productsDetails=data.map((item)=>{
            item.colors=colors.slice(Math.floor(Math.random()*5));
            item.sizes=sizes.slice(Math.floor(Math.random()*4));
            return item;
        })
        
        // console.log('data',productsDetails);
    }).catch((err)=>{console.log(`fetch Products api failed${err}`)});
    
}
else{
    window.location.href='/login/index.html'
}

//async function for data fetching form https://fakestoreapi.com/products
async function fetchProducts(url){
    try{
        let res=await fetch(`${url}/products`);
        if(!res.ok)
        throw new Error(`HTTP Error! Status: ${res.status}`)
        return res.json();
    }catch(e){
        console.log(`Network issue Error: ${e.name}`);
        console.log(` Message:${e.message}`)
    }finally{
        console.log('completed')
    }
}