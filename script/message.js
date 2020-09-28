
const createMessage=document.querySelector('.create-message');
const name = document.querySelector('#names');
const email = document.querySelector('#email');
const message = document.querySelector('#message');



  createMessage.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('messages').add({
      name: name.value,
      email: email.value,
      message: message.value,
      
});
    name.value = '';
    email.value  = '';
    message.value  = '';
    
  })


  