const form = document.querySelector('#add-blog-form');
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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const articleId = urlParams.get('id')
let currentImage = '';
db.collection('posts').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        if (articleId == doc.id) {
            const articleData = doc.data();
            form.title.value = articleData.title;
            form.description.value = articleData.description;
            form.body.value = articleData.body;
            currentImage = articleData.coverImage
        }
    })
});

// saving data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    const image = imageLink ? imageLink : currentImage;
    db.collection('posts').doc(articleId).update({
        body: form.body.value,
        description: form.description.value,
        title: form.title.value,
        coverImage: image
    });
})

//
const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace('../index.html');
   
  // auth.signout().then(() =>{
    console.log('user signed out');
});