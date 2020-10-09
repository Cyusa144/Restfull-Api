// const cafeList1 = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');
const  projectUserView = document.querySelector('#project-list-user')
// const ref = firebase.storage().ref();
// projectUserView.style.display = 'grid';
// projectUserView.style.gridColumnGap='20px';
// projectUserView.style.rowGap='15px';
// projectUserView.style.gridTemplateColumns='repeat(4,1fr)';
// projectUserView.style.padding='10px';
  

// let imageLink;
// const coverImage = document.querySelector('.cover-image')
//  coverImage.addEventListener('change',function(){
//    const file =coverImage.files[0]
//    const name = file.name
  
//    const metadata = {
//      contentType:file.type 

//    }

//    const task = ref.child(name).put(file,metadata)
//      task.then(snapshot => snapshot.ref.getDownloadURL())
//      .then(url =>{
//        imageLink = url
//      })
//  })



function renderprojectUser(doc){
  let div= document.createElement('div');
  let name = document.createElement('img');
  let city = document.createElement('span');
  

  div.setAttribute('data-id',doc.id);
  div.classList.add('list-projects')
  name.setAttribute('src',doc.data().coverImage);
  name.classList.add('img-skills')
  city.textContent = doc.data().description;
  

  div.appendChild(name);
  div.appendChild(city);
  

  projectUserView.appendChild(div);
}


db.collection('projects').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderprojectUser(doc)
  })
})
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




