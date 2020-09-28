
const createMessage=document.querySelector('.signup-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');



  createMessage.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('users').add({
      names: name.value,
      email: email.value,
      password: password.value,
      
});
    name.value = '';
    email.value  = '';
    password.value  = '';
    
  })


  