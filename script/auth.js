//signin
const signinForm = document.querySelector('#signin-form');
signinForm.addEventListener('submit',(e) =>{
    e.preventDefault();


 //get user info
 const email = signinForm['signin-email'].value;
 const password = signinForm['signin-password'].value;
  
  //sign in the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
     console.log(cred.user);
    //  const modal = document.querySelector('#modal-signin in');
    //  M.modal.getInstance(modal).close();
     signinForm.reset()
  })


})
