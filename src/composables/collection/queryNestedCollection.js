import { ref } from "vue";
import {db} from "../../firebase/config";
import {
  doc,
  getDocs,
  collection,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";

console.log("in query firestore is ",db)

const queryNestedCollectionById = () => {
  const error = ref(null);
  const documents = ref([]);

  const loadNestedCollection = async (collectionName, nestedCollectionName, tripId, userId) => {
    console.log("in get collection");
    console.log("db is ", db);

    // let collectionRef = collection(db, collectionName)

    const q = query(
      collection(db, collectionName, tripId , nestedCollectionName),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      documents.value.push([doc.id,doc.data()]);
    });
  };

  return { documents, error, loadNestedCollection };
};

export default queryNestedCollectionById;