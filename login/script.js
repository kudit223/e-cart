// login js
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const checkbox = document.querySelector('#checkbox');
const loginBtn = document.querySelector('#login');
const error = document.querySelector('#error');


//login btn click
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkLoginDetails();
});

// check for vaild email and password from our local storage.
function checkLoginDetails() {
    let emailValue = email.value;
    let passwordValue = password.value;
    let isChecked = checkbox.checked;
    if (!emailValue || !passwordValue) {
        error.textContent = 'Please enter all required fields!!'
        return;
    }
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isEmailSyntaxVaild = regex.test(email.value);

    if(!isEmailSyntaxVaild){
        error.textContent='Please enter vaild email!!';//check for email syntax
    }else{
        const allUserDetails=JSON.parse(localStorage.getItem('allUserDetails'))??[];
        for(let user of allUserDetails){
            if(user.email===emailValue&&user.password===passwordValue){
                //user is present in my local storage
                error.textContent='';
                alert('login successfully!!');
                user.lastLoginDate=new Date();
                user.isRemberMe=isChecked;
                const currentLoginUser=user; //current login user
                localStorage.setItem('currentLoginUser',JSON.stringify(currentLoginUser));
                localStorage.setItem('allUserDetails',JSON.stringify(allUserDetails));
                return;
            }else{
                error.textContent='Invalid email or password!!'
            }
        }
    }
}