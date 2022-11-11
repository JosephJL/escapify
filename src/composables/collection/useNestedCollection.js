import { collection, addDoc ,deleteDoc ,doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { ref } from "vue";

const useNestedCollection = () => {
  const error = ref(null);

  const addDestination = async (tripId, destinationInfo) => {
    // console.log("reached add destination!, data received is ",tripId,destinationInfo)
    error.value = null;
    try {
      await addDoc(collection(db, "trips",tripId,"destinations"), destinationInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const delHotel = async (tripId,hotelId) => {
    // console.log("reached del destination!, data received is ",tripId,hotelId)
    error.value = null;
    try {
      await deleteDoc(doc(db, "trips",tripId,"hotels",hotelId));
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  }

  const addHotel = async (tripId, hotelInfo) => {
    error.value = null;
    try {
      await addDoc(collection(db, "trips",tripId,"hotels"), hotelInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const delDestination = async (tripId,destId) => {
    // console.log("reached del destination!, data received is ",tripId,destId)
    error.value = null;
    try {
      await deleteDoc(doc(db, "trips",tripId,"destinations",destId));
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  }

  return { addHotel, addDestination, error , delDestination, delHotel };
};

export default useNestedCollection;
