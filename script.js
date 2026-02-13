const fname=document.querySelector('#fname');
const lname=document.querySelector('#lname');
const email=document.querySelector('#email');
const password=document.querySelector('#password');
const confirmPassword=document.querySelector('#confirmpassword');
const signUpBtn=document.querySelector('#signup');

const error=document.querySelector('#error');
const success=document.querySelector('#success');

//Total user
let allUserDetails=[];

// signup button clicked
signUpBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    storeSignUpDetails();
});

// storeSignUpDetails
function storeSignUpDetails(){
    let fnameValue=fname.value;
    let lnameValue=lname.value;
    let emailValue=email.value;
    let passwordValue=password.value;
    let confirmPasswordValue=confirmPassword.value;

    if(!fnameValue||!lnameValue||!emailValue||!passwordValue||!confirmPasswordValue){
        error.textContent="Please enter all required Fields!";
        return;
    }

    let regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let checkForVaildEmail=regex.test(emailValue);

    if(passwordValue!==confirmPasswordValue){
        error.textContent="Please make sure password and confirm password are equall!!"
    }else if(!checkForVaildEmail){
        error.textContent="Please enter vaild email address!!"
    }else{
        
        const userDetails={
        fname:fnameValue,
        lname:lnameValue,
        email:emailValue,
        password:passwordValue,
        confirmPassword:confirmPasswordValue
        }
        error.textContent='';
        if(checkForUserAlreadyExisted(userDetails)){
            success.textContent='Your Email is already exist please login in!!'
        }else
        success.textContent="Account created successfully!!"

        console.log(userDetails)
    }
   
}

// checkForUserAlreadyExisted
function checkForUserAlreadyExisted(userDetails){
    let isUserAlreadyExist=false;
    allUserDetails=JSON.parse(localStorage.getItem('allUserDetails'))??[];
    
    allUserDetails.forEach(item=>{
        if(item.email===userDetails.email){
            isUserAlreadyExist=true;
            return;
        }
    });
    if(isUserAlreadyExist)
        return isUserAlreadyExist;
    allUserDetails.push(userDetails);
    localStorage.setItem('allUserDetails',JSON.stringify(allUserDetails));
    return isUserAlreadyExist;
}
// console.log(JSON.parse(localStorage.getItem('user')))