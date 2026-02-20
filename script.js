const loginBtn=document.querySelector('#login');
const signupBtn=document.querySelector('#signup');

//user clicked on login btn
loginBtn.addEventListener('click',(e)=>{
window.location.href='/login/index.html'
})

//user clicked on signup btn
signupBtn.addEventListener('click',(e)=>{
window.location.href='/signup/index.html'
})