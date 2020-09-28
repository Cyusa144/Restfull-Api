
const createMessage=document.querySelector('.signin-form');



  createMessage.addEventListener('submit', (e) =>{
    //
    e.preventDefault();
    db.collection('users').get().then((snapshot) =>{
      
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
      snapshot.docs.forEach(doc => {
        const dataemail = doc.data().email;
        const datapassword = doc.data().password;
        if(email == dataemail && password == datapassword) {
          window.location.replace("project.html");
          return;
        }
      })
    });
    
  })


  