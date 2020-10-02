

//signin
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{
    e.preventDefault();


 //get user info
 const email = signupForm['email'].value;
 const password = signupForm['password'].value;
  
  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
     console.log(cred.user);
    //  const modal = document.querySelector('#modal-signin in');
    //  M.modal.getInstance(modal).close();
     signupForm.reset()
  })


})

//logout
// const logout = document.querySelector('.logout');
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signout().then(() =>{
//     console.log('user signed out');
//   });
// });

// const createMessage=document.querySelector('.signup-form');
// const name = document.querySelector('#name');
// const email = document.querySelector('#email');
// const password = document.querySelector('#password');



//   createMessage.addEventListener('submit', (e) =>{
//     e.preventDefault();
//     db.collection('users').add({
//       names: name.value,
//       email: email.value,
//       password: password.value,
      
// });
//     name.value = '';
//     email.value  = '';
//     password.value  = '';
    
//   })









  