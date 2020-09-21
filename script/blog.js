firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
  
  const toggleButton = document.getElementsByClassName('toggle-button')[0]
  const navbarLinks = document.getElementsByClassName('navbar-links')[0]
  
  toggleButton.addEventListener('click', () => { navbarLinks.classList.toggle('active')
  })
   let blogList = document.getElementsByClassName('blog-list')[0];
   

db.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {renderPost(doc) 
        console.log(doc.data())
    });
});

let divisions='';


function renderPost(doc){
    let onePost=`
    <div class="blog-container">
    <div class="blog-image">
        <img class="image" src="${doc.data().coverImage}" alt="image">
    </div>
    <div class="blog-content">
        <h1>${doc.data().title}</h1>
        <p>${doc.data().description}</p>
        <p><span class="psw"><a href="./articles.html#/${doc.id}">Read more</a></span></p>
    </div>
</div> 
    
    
    `;
    divisions=divisions+onePost;
    blogList.innerHTML=divisions;
}





