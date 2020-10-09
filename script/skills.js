
const skillsList = document.querySelector('#skills-list');
const form1 = document.querySelector('#add-skills-form1');
const skillUserView = document.querySelector('#skill-user-view');
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

// create element and render cafe
function renderCafe(doc){
  let li = document.createElement('li');
  let name = document.createElement('img');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  
  li.setAttribute('data-id',doc.id);
  name.setAttribute('src', doc.data().coverImage);
  name.classList.add("img-skills")
  city.textContent = doc.data().description;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  skillsList.appendChild(li);


  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('skills').doc(id).delete();
  })
}
// function renderSkillUserView(doc){
//   let li = document.createElement('li');
//   let name = document.createElement('img');
//   let city = document.createElement('span');
  

  
//   li.setAttribute('data-id',doc.id);
//   name.setAttribute('src', doc.data().coverImage);
//   name.classList.add("img-skills")
//   city.textContent = doc.data().description;
  

//   li.appendChild(name);
//   li.appendChild(city);

//   skillUserView.appendChild(li);
// }


db.collection('skills').get().then((snapshot) =>{
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {
      renderCafe(doc);
  })
});


// db.collection('skills').get().then((snapshot) =>{
//   snapshot.docs.forEach(doc =>{
//     renderSkillUserView(doc);
//   })
// })

//saving data
form1.addEventListener('submit',(e) => {
  e.preventDefault();
  db.collection('skills').add({
      coverImage:imageLink,
      description:form1.description.value
  });
  form1.coverImage.value = '';
  form1.description.value = '';
})
//log out
const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace('../index.html');
   
  // auth.signout().then(() =>{
    console.log('user signed out');
});
