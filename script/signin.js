const loginForm = document.querySelector('#signin-form');
loginForm.addEventListener('submit', (e) =>{
  e.preventDefault();


  const email = loginForm['email'].value;
  const password=loginForm['password'].value;

  // if(email == 'email' && password =='password'){
  //   window.location.replace('project.html');
  //   return;
  // }

  auth.signInWithEmailAndPassword(email,password).then(cred =>{
     loginForm.reset();
      window.location.replace('../Html/project.html');
   
  })
})

// const loginForm=document.querySelector('.signin-form');



//   loginForm.addEventListener('submit', (e) =>{
    
//     e.preventDefault();
//     db.collection('users').get().then((snapshot) =>{
      
// const email = document.querySelector('#email').value;
// const password = document.querySelector('#password').value;
//       snapshot.docs.forEach(doc => {
//         const dataemail = doc.data().email;
//         const datapassword = doc.data().password;
//         if(email == dataemail && password == datapassword) {
//           window.location.replace("project.html");
//           return;
//         }
//       })
//     });
    
//   })


  