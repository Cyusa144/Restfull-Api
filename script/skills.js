
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
  const ref = firebase.storage().ref();
  db.collection('skills').get().then((snapshot)=>{
  
    snapshot.docs.forEach(doc => {
      console.log(doc.data())
     renderSkills(doc)
      
    });
    
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
  });
  

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


  const addSkillProject=document.querySelector('.add-skill-project');
  addSkillProject.addEventListener('submit', function(e){
    e.preventDefault()
    db.collection('skills').add({
      
      
      description: addSkillProject.description.value,
      coverImage:imageLink

    })
 addSkillProject.reset()
  })

function renderSkills(doc){
  const skillContainer = document.querySelector('.skills-container')
    //  let skillImage = document.createElement('img')
    //  skillImage.setAttribute('src','../photos/user.png')
    //  let commentName = document.createElement('p')
    //  commentName.textContent=doc.data().name


    //  skillContainer.appendChild(skillImage)
    //  skillContainer.appendChild(skillName)
  
    let skills = `<div class="portolio-item" >
                   <img class="image" src="${doc.data().coverImage}" alt="">
                  <p class="portofolio-paragraph">${doc.data().description}</p>
                 </div>`
                 skillContainer.innerHTML += skills

}









  