const dashBlog = document.querySelector('.dash-blog');
  
db.collection('posts').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    function renderDashBlog(doc) {}
      console.log(doc.id)
    
      let div = document.createElement('div')
      let divImage = document.createElement('div')
      let divContent = document.createElement('div')
     
      let blogImg = document.createElement('img')
      let blogTitle = document.createElement('h1')
      let blogParagraph = document.createElement('p')
      let deleteButton = document.createElement('button')
      let editButton = document.createElement('button')


      div.setAttribute('id', doc.id)
      div.setAttribute("class",'blog-container')
      divImage.setAttribute('class','blog-image')
      divContent.setAttribute('class','blog-content')
      console.log(div)
       blogParagraph.textContent = doc.data().body;
       blogTitle.textContent = doc.data().title
       blogImg.src = doc.data().coverImage
       deleteButton.innerHTML='delete'
       editButton.innerHTML='edit'

       deleteButton.setAttribute('class', 'deleteBlog')
    
      divImage.appendChild(blogImg),
      divContent.appendChild(blogTitle)
      divContent.appendChild(blogParagraph)
      divContent.appendChild(deleteButton)
      divContent.appendChild(editButton)
 
      div.appendChild(divImage)
      div.appendChild(divContent)
       
      
 
      dashBlog.appendChild(div)
      
 
 
   const deleteBlog = document.querySelector(".deleteBlog")
   deleteBlog.addEventListener('click',(e) =>{
     e.stopPropagation();
     let blogId = document.querySelector(`#${doc.id}`)

 // db.collection('posts').doc(blogId).delete();
 console.log (blogId)
   })  
  });
});
// let divisions = '';
  function renderDashBlog(doc){
    console.log(doc.id)

    let onePost=`

    <div class="blog-container">
    <div class="blog-image">
        <img class="image" src="${doc.data().coverImage}" alt="image">
    </div>
    <div class="blog-content" id="${doc.id}">
        <p class="blogId">paragraph</p>
        <h1>${doc.data().title}</h1>
        <p>${doc.data().description}</p>
        <button class="deleteBlog">delete</button>
        <button>edit</button>
        <p><span class="psw"><a href="./articles.html#/${doc.id}">Read more</a></span></p>
    </div>
</div> 
    
    
//     `;

    divisions=divisions+onePost;
    dashBlog.innerHTML=divisions;

}

function deleteBlog(){
let blogId = document.querySelector('.blogId')
db.collection('posts').doc(blogId).delete();
}