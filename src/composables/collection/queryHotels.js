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

const queryHotels = () => {
  const error = ref(null);
  const documents = ref([]);

  const loadHotelsCollection = async (tripId, destinationId, userId) => {
    console.log("in get collection");
    console.log("db is ", db);

    // let collectionRef = collection(db, collectionName)

    const q = query(
      collection(db, "trips", tripId , "destinations", destinationId, "accomodations"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      documents.value.push([doc.id,doc.data()]);
    });
  };

  return { documents, error, loadHotelsCollection };
};

export default queryHotels;