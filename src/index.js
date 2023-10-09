import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, getDoc, updateDoc,
  query, where, orderBy, serverTimestamp
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

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
const auth = getAuth()

// collection ref
const colRef = collection(db, 'Books')

// queries 
const q = query(colRef, orderBy("createdAt"))

// real time collection data
onSnapshot(q, (snapshot) => {
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
    createdAt: serverTimestamp()
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

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// get a single document
const docRef = doc(db, "Books", "VBeKlKr4JJCp0lhENVk2");
onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'Books', updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title"
  }).then(() => {
    updateForm.reset();
  })
  ;

});
