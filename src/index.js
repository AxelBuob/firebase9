import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCbWA9PLeN-6LS0gEfvvS3mvnUWDIdSbNA",
    authDomain: "fir-9-dojo-de86c.firebaseapp.com",
    projectId: "fir-9-dojo-de86c",
    storageBucket: "fir-9-dojo-de86c.appspot.com",
    messagingSenderId: "37345275342",
    appId: "1:37345275342:web:2739c3c05f33cb88400f9f"
  };
// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'Books')

// real time collection data
onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
});

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Books', deleteBookForm.id.value)
    console.log(docRef);

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})