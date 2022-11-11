import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// require('dotenv').config()
console.log(process.env)
// const config = dotenv.config()
// if(config.error){
//   console.log('Could not load env file', config.error)
// }

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB4fSY8uJG1JutLm82R89N09tivzuDGOXc",
//   authDomain: "foodapp-2ef25.firebaseapp.com",
//   databaseURL: "https://foodapp-2ef25-default-rtdb.firebaseio.com",
//   projectId: "foodapp-2ef25",
//   storageBucket: "foodapp-2ef25.appspot.com",
//   messagingSenderId: "82856466053",
//   appId: "1:82856466053:web:6a8a2d4aad486a6a643bec"
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export {db,storage} ;
