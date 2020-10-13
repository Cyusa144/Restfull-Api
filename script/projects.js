const projectList = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');
// const  projectUserView = document.querySelector('#project-list-user')
const ref = firebase.storage().ref();
  

let imageLink;
const coverImage = document.querySelector('.cover-image')
 coverImage.addEventListener('change',function(){
   const file =coverImage.files[0]
   const name = file.name
  
   const metadata = {
     contentType:file.type 

   }

   const task = ref.child(name).put(file,metadata)
     task.then(snapshot => snapshot.ref.getDownloadURL())
     .then(url =>{
       imageLink = url
     })
 })


// create element and render projects
function renderProjects(doc){
  let li = document.createElement('li');
  let name = document.createElement('img');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id',doc.id);
  name.setAttribute('src',doc.data().coverImage);
  name.classList.add('img-skills')
  city.textContent = doc.data().description;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  projectList.appendChild(li);


  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('projects').doc(id).delete();
  })
}

db.collection('projects').get().then((snapshot) =>{
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {

   renderProjects(doc);
     
  })
});

//saving data
form.addEventListener('submit',(e) => {
  e.preventDefault();
  db.collection('projects').add({
      coverImage:imageLink,
      description:form.description.value
  });
  form.coverImage.value = '';
  form.description.value = '';
})

//log out
const signout = document.querySelector('.logout');
signout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
    window.location.replace('../index.html');
  })
});

//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'signin.html'; //If User is not logged in, redirect to login page
  }
});

