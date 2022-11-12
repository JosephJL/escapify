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

// console.log("in query firestore is ",db)

const queryHotels = () => {
  const hotelError = ref(null);
  const hotels = ref([]);

  const loadHotelsCollection = async(tripId, userId) => {
    // console.log("in get collection");
    // console.log("db is ", db);

    // let collectionRef = collection(db, collectionName)

    const q = query(
      collection(db, "trips", tripId, "hotels"),
      where("userId", "==", userId)
    );

    onSnapshot(q, (querySnapshot) => {
      const accom = [];
      hotels.value = [];
      querySnapshot.forEach((doc) => {
          accom.push(doc.data());
          hotels.value.push([doc.id,doc.data()]);
      });
      console.log("Current accoms: ", accom.join(", "));
    });

    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   hotels.value.push([doc.id,doc.data()]);
    // });
  };

  return { hotels, hotelError, loadHotelsCollection };
};

export default queryHotels;