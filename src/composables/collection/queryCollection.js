import { ref } from "vue";
import db from "../../firebase/config";
import {
  doc,
  getDocs,
  collection,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";

const collection = () => {
  const error = ref(null);
  const documents = ref([]);

  const load = async (collectionName, userId) => {
    console.log("in get collection");
    console.log("db is ", db);

    // let collectionRef = collection(db, collectionName)

    const q = query(
      collectionGroup(db, collectionName),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      documents.value.push(doc.data());
    });
  };

  return { documents, error, load };
};

export default queryCollectionById;
