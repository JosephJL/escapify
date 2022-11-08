import { ref } from "vue";
import { db } from "../../firebase/config";
import {
  doc,
  getDocs,
  collection,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";

console.log("in query firestore is ", db);

const queryCollectionById = () => {
  const error = ref(null);
  const documents = ref([]);

  const loadCollection = async (collectionName, userId) => {
    // console.log("in get collection");
    // console.log("db is ", db);

    // let collectionRef = collection(db, collectionName)

    const q = query(
      collection(db, collectionName),
      where("userId", "==", userId)
    );

    // const querySnapshot = await getDocs(q);

    onSnapshot(q, (querySnapshot) => {
      const trips = [];
      documents.value = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data().name);
        documents.value.push([doc.id, doc.data()]);
      });
      console.log("Current trips: ", trips.join(", "));
    });
  };

  const loadTripsCollection = async () => {
    // console.log("in get collection");
    // console.log("db is ", db);

    // let collectionRef = collection(db, collectionName)

    const q = query(collection(db, "trips"));

    // const querySnapshot = await getDocs(q);

    onSnapshot(q, (querySnapshot) => {
      const trips = [];
      documents.value = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data().name);
        documents.value.push([doc.id, doc.data()]);
      });
      console.log("ALL TRIPS: ", trips.join(", "));
    });
  };

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());

  //   // console.log("documents in collection is,",documents)
  // });

  return { documents, error, loadCollection, loadTripsCollection };
};

export default queryCollectionById;
