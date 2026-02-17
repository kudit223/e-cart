//profile js
const currentLoginUser = JSON.parse(localStorage.getItem('currentLoginUser'));

if (currentLoginUser) {
    // user login
    //showing the name of current login user
    function showUserNameFunc() {
        const showUserName = document.querySelector('#showUserName');

        const userDetails = JSON.parse(localStorage.getItem('allUserDetails'));
        for (let user of userDetails) {
            if (user.email === currentLoginUser.email && user.password === currentLoginUser.password) {
                showUserName.textContent = `Hey!!,${user.fname} ${user.lname}`;
                break;
            }
        }
    }
    showUserNameFunc();
    //selecting name fields for updating user name
    const fname = document.querySelector('#fname');
    const lname = document.querySelector('#lname');
    const saveInfoBtn = document.querySelector('#saveInfo');
    const error = document.querySelector('#error');
    const success = document.querySelector('#success')

    //user clicked save info
    saveInfoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateUserName();
    });

    //this function update the first name and last name
    function updateUserName() {
        let fnameValue = fname.value;
        let lnameValue = lname.value;

        if (!fnameValue || !lnameValue) {
            // when field are empty
            error.textContent = 'Please enter all required fields!!';
            return;
        }
        let userEmail = currentLoginUser.email;
        let userPassword = currentLoginUser.password;

        //get all user details from local storage
        const allUserDetails = JSON.parse(localStorage.getItem('allUserDetails'));
        for (let user of allUserDetails) {
            if (user.email === userEmail && user.password === userPassword) {
                user.fname = fnameValue;
                user.lname = lnameValue;
                localStorage.setItem('allUserDetails', JSON.stringify(allUserDetails));
                error.textContent = '';
                success.textContent = 'Update successfully!!';
                reload();
                showUserNameFunc();
                return;
            }
        }

    }

    // selecting password fields
    const oldPassword = document.querySelector('#oldPassword');
    const newPassword = document.querySelector('#newPassword');
    const confirmNewPassword = document.querySelector('#confirmNewPassword');
    const changePasswordBtn = document.querySelector('#changePassword')
    const errorForPasswordChange = document.querySelector('#errorForPasswordChange');
    const successForPasswordChange = document.querySelector('#successForPasswordChange');

    //user click change password
    changePasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateUserPassword();
    });

    //this function update user old password with new password
    function updateUserPassword() {
        let oldPasswordValue = oldPassword.value;
        let newPasswordValue = newPassword.value;
        let confirmNewPasswordValue = confirmNewPassword.value;

        //if any field is/are empty
        if (!oldPasswordValue || !newPasswordValue || !confirmNewPasswordValue) {
            errorForPasswordChange.textContent = 'Please enter all requried fields!!';
            return;
        }

        if (newPasswordValue !== confirmNewPasswordValue) {
            // new password and confirm password dont match
            errorForPasswordChange.textContent = 'Please make sure password and confirm password are equall!!';
        } else {
            let userEmail = currentLoginUser.email;

            // get all user details from local storage
            const allUserDetails = JSON.parse(localStorage.getItem('allUserDetails'));
            for (let user of allUserDetails) {
                if (user.email === userEmail && user.password === oldPasswordValue) {
                    //password update
                    user.password = newPasswordValue;
                    user.confirmPassword = newPasswordValue;

                    //update the password of current login user
                    currentLoginUser.password = newPasswordValue;
                    localStorage.setItem('currentLoginUser', JSON.stringify(currentLoginUser));
                    localStorage.setItem('allUserDetails', JSON.stringify(allUserDetails));
                    errorForPasswordChange.textContent = '';
                    successForPasswordChange.textContent = 'Password Updated Successfully!!';
                    reload();
                    return;
                } else {
                    errorForPasswordChange.textContent = 'Please enter the vaild old password!!';
                }
            }
        }
    }
    //if user want to logout
    const logoutBtn = document.querySelector('#logout');

    logoutBtn.addEventListener('click', (e) => {
        localStorage.removeItem('currentLoginUser');
    })

    // this function will empty the fields after successfully upadate
    function reload() {
        fname.value = '';
        lname.value = '';
        oldPassword.value = '';
        newPassword.value = '';
        confirmNewPassword.value = '';
    }
} else {
    // user not login
    window.location.href = '/login/index.html'
}