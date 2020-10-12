// var firebaseConfig = {
//   apiKey: "AIzaSyA3pn7TTuOUoGPk3pliVUgbH5-xIysHHj8",
//   authDomain: "cyusa-project-9570e.firebaseapp.com",
//   databaseURL: "https://cyusa-project-9570e.firebaseio.com",
//   projectId: "cyusa-project-9570e",
//   storageBucket: "cyusa-project-9570e.appspot.com",
//   messagingSenderId: "1085067100368",
//   appId: "1:1085067100368:web:9496966a0e62e503f91ed5",
//   measurementId: "G-3X352JZ9HR"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const db = firebase.firestore();


const messageList = document.querySelector('#message-list');
const form = document.querySelector('#add-message-form');


// create element and render cafe
function renderMesssage(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let email = document.createElement('span');
  let message = document.createElement('span');
  let cross = document.createElement('div');
  

  li.setAttribute('data-id',doc.id);
  name.textContent = (doc.data().name);
  email.textContent = (doc.data().email);
  message.textContent = (doc.data().message);
  cross.textContent = 'x';
  

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(message);
  li.appendChild(cross);

  messageList.appendChild(li);


  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('messages').doc(id).delete();
  })
}

db.collection('messages').get().then((snapshot) =>{
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {
      renderMesssage(doc);
  })
});

// saving data
form.addEventListener('submit',(e) => {
  e.preventDefault();
  db.collection('messages').add({
      coverImage:form.coverImage.value,
      description:form.description.value
  });
  form.coverImage.value = '';
  form.description.value = '';
})
//log out
const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace('../index.html');
   
  // auth.signout().then(() =>{
    console.log('user signed out');
});
















// const dashBlog = document.querySelector('.dash-blog');
// const form = document.querySelector('#add-cafe-form');

// create element & render cafe
// db.collection('posts').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         function renderDashBlog(doc){
//             let div = document.createElement('div');
//             let divImage = document.createElement('div');
//             let divContent = document.createElement('div');
//             let deleteButton = document.createElement('div');
      
//             div.setAttribute('data-id', doc.id);
//             div.setAttribute('class','blog-container');
//             div.setAttribute('class','blog-image');
//             divImage.textContent = doc.data().coverImage;
//             divContent.textContent = doc.data().body;
//             deleteButton.textContent = 'delete';
      
//             div.appendChild(divImage);
//             div.appendChild(divContent);
//             div.appendChild(deleteButton);
      
//             dashBlog.appendChild(li);
      
          // deleting data
          // deleteButton.addEventListener('click', (e) => {
          //     e.stopPropagation();
          //     let id = e.target.parentElement.getAttribute('data-id');
          //     db.collection('posts').doc(id).delete();
          // })