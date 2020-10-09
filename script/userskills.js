
const skillsList = document.querySelector('#skills-list');
const form1 = document.querySelector('#add-skills-form1');
const skillUserView = document.querySelector('#skill-user-view');
const ref = firebase.storage().ref();
// skillUserView.style.display = 'grid';
// skillUserView.style.gridColumnGap='20px';
// skillUserView.style.rowGap='15px';
// skillUserView.style.gridTemplateColumns='repeat(4,1fr)';
// skillUserView.style.padding='10px';
  

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

function renderSkillUserView(doc){
  let div = document.createElement('div');
  let name = document.createElement('img');
  let city = document.createElement('span');
  

  
  div.setAttribute('data-id',doc.id);
  div.classList.add('list-skills')
  name.setAttribute('src', doc.data().coverImage);
  name.classList.add("img-skills")
  city.textContent = doc.data().description;
  

  div.appendChild(name);
  div.appendChild(city);

  skillUserView.appendChild(div);
}

db.collection('skills').get().then((snapshot) =>{
  snapshot.docs.forEach(doc =>{
    renderSkillUserView(doc);
  })
})

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
