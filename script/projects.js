const cafeList1 = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');
const  projectUserView = document.querySelector('#project-list-user')


// create element and render cafe
function renderCafe1(doc){
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

  cafeList1.appendChild(li);


  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('projects').doc(id).delete();
  })
}


function renderprojectUser(doc){
  let li = document.createElement('li');
  let name = document.createElement('img');
  let city = document.createElement('span');
  

  li.setAttribute('data-id',doc.id);
  name.setAttribute('src',doc.data().coverImage);
  name.classList.add('img-skills')
  city.textContent = doc.data().description;
  

  li.appendChild(name);
  li.appendChild(city);
  

  projectUserView.appendChild(li);
}







db.collection('projects').get().then((snapshot) =>{
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {

   renderCafe1(doc);
     
  })
});


db.collection('projects').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderprojectUser(doc)
  })
})
//saving data
form.addEventListener('submit',(e) => {
  e.preventDefault();
  db.collection('projects').add({
      coverImage:form.coverImage.value,
      description:form.description.value
  });
  form.coverImage.value = '';
  form.description.value = '';
})




