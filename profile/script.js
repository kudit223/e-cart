//profile js
const currentLoginUser=JSON.parse(localStorage.getItem('currentLoginUser'));

if(currentLoginUser){

}else{
    window.location.href='/login/index.html'
}