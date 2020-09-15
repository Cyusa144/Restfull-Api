firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
  
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const wrapper = document.getElementsByClassName('wrapper')[0]

const articleList = document.querySelector('#article-list');
const form = document.querySelector('#add-article-form');

toggleButton.addEventListener('click', () => { wrapper.classList.toggle('active')
})

function renderPost(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let Author = document.createElement('span');
    let number = document.createElement('span')
    
    li.setAttribute('data-id', doc.id);
    li.setAttribute('class','border');
    title.textContent = doc.data().title;
    Author.textContent = doc.data().Author;
    number.textContent = doc.data().number;

    li.appendChild(number);
    li.appendChild(title);
    li.appendChild(Author);
    

    articleList.insertAdjacentElement('beforeend',li);


}

db.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {renderPost(doc) 
        console.log(doc.data())
    });
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('posts').add({
        number:form.number.value,
        title: form.title.value,
        Author: form.Author.value,
        time: Date.now(),
        type: 'article'
    });
})




