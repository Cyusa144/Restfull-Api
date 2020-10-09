var firebaseConfig = {
    apiKey: "AIzaSyA3pn7TTuOUoGPk3pliVUgbH5-xIysHHj8",
    authDomain: "cyusa-project-9570e.firebaseapp.com",
    databaseURL: "https://cyusa-project-9570e.firebaseio.com",
    projectId: "cyusa-project-9570e",
    storageBucket: "cyusa-project-9570e.appspot.com",
    messagingSenderId: "1085067100368",
    appId: "1:1085067100368:web:9496966a0e62e503f91ed5",
    measurementId: "G-3X352JZ9HR"
};
firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();

  let link = window.location.href
  link = link.split('/').reverse()

  const id = link[0]
 

 const imageDiv=document.querySelector('.article-image');
 let title = document.querySelector('.title');
 let body = document.querySelector('.body')


 function renderArticle(doc){
  let image = document.createElement('img')
  image.setAttribute('src',doc.data().coverImage)
  imageDiv.appendChild(image)
  title.textContent=doc.data().title
  body.textContent=doc.data().body
   
 }
 

  db.collection('posts').doc(id).get().then(doc=>{
      renderArticle(doc)
  })

  const addComment=document.querySelector('.form-container');
  addComment.addEventListener('submit', function(e){
    e.preventDefault()
    db.collection('posts').doc(id).collection('comments').add({
      name: addComment.names.value,
      email: addComment.email.value,
      comment: addComment.comment.value,
      blogId:id

    })
 addComment.reset()
  })

  function renderComments(doc){
     const commentsContainer = document.querySelector('.comments-container')
     const singleComment = document.createElement('div')
     singleComment.classList.add("single-comment");
     const commentImage = document.createElement('img')
     commentImage.setAttribute('src','../photos/user.png')
     commentImage.classList.add("img-circle");
     const namesDiv = document.createElement('div')
     namesDiv.classList.add("name-div");
     let commentName = document.createElement('h3')
     commentName.textContent=doc.data().name
     let comment = document.createElement('p')
     comment.textContent= doc.data().comment

     namesDiv.appendChild(commentName)
     namesDiv.appendChild(comment)
     singleComment.appendChild(commentImage)
     singleComment.appendChild(namesDiv)
     commentsContainer.appendChild(singleComment)
  

  }
  db.collection('posts').doc(id).collection('comments').get().then((snapshot)=>{
      //console.log(doc.data())
      snapshot.docs.forEach(doc => {
       renderComments(doc)
        
      });
      
  })