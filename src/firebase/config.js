import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4fSY8uJG1JutLm82R89N09tivzuDGOXc",
    authDomain: "foodapp-2ef25.firebaseapp.com",
    databaseURL: "https://foodapp-2ef25-default-rtdb.firebaseio.com",
    projectId: "foodapp-2ef25",
    storageBucket: "foodapp-2ef25.appspot.com",
    messagingSenderId: "82856466053",
    appId: "1:82856466053:web:6a8a2d4aad486a6a643bec"
  };


//init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {db}
