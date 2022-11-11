import { ref } from "vue";
import { db } from "../../firebase/config";
import {
  doc,
  getDocs,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";

const getCollection = (collectionName) => {
  // console.log("in get collection");
  // console.log("db is ", db);
  const error = ref(null);
  const documents = ref(null);

  // let collectionRef = collection(db, collectionName)
  onSnapshot(
    collection(db, collectionName),
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        results.push(doc.data());
      });
      // console.log("results is ", results);
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch data";
    }
  );

  return { documents, error };
};

export default getCollection;
