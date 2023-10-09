import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCbWA9PLeN-6LS0gEfvvS3mvnUWDIdSbNA",
    authDomain: "fir-9-dojo-de86c.firebaseapp.com",
    projectId: "fir-9-dojo-de86c",
    storageBucket: "fir-9-dojo-de86c.appspot.com",
    messagingSenderId: "37345275342",
    appId: "1:37345275342:web:2739c3c05f33cb88400f9f"
  };

// init firebase app
initializeApp(firebaseConfig);

// init services 
const db = getFirestore();

// collection ref
const colRef = collection(db, 'Books');

// get collection data 
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
    })
    .catch(err => {
        console.error(err.message);
    });