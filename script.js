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
    error.textContent='';
    success.textContent='';

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
        
        if(checkForUserAlreadyExisted(userDetails)){
            error.textContent='Your Email is already exist please login in!!'
        }else{
            error.textContent='';
            success.textContent="Account created successfully!!"
            reloadPage();
        }

    
    }
   
}

// check For User Already Existed
function checkForUserAlreadyExisted(userDetails){
    let isUserAlreadyExist=false;
    allUserDetails=JSON.parse(localStorage.getItem('allUserDetails'))??[];

    for(let user of allUserDetails){
        if(user.email===userDetails.email){
            isUserAlreadyExist=true;
            return isUserAlreadyExist
        }
    }

    userDetails.sigupDate=new Date();
    allUserDetails.push(userDetails);
    localStorage.setItem('allUserDetails',JSON.stringify(allUserDetails));
    return isUserAlreadyExist;
}

// reload page
function reloadPage(){
    fname.value="";
    lname.value="";
    email.value="";
    password.value="";
    confirmPassword.value="";

}
// console.log(JSON.parse(localStorage.getItem('user')))