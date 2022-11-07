import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { ref } from "vue";

const useNestedCollection = () => {
  const error = ref(null);

  const addDestination = async (tripId, destinationInfo) => {
    console.log("reached add destination!, data received is ",tripId,destinationInfo)
    error.value = null;
    try {
      await addDoc(collection(db, "trips",tripId,"destinations"), destinationInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const addHotel = async (tripId, hotelInfo) => {
    error.value = null;
    try {
      await addDoc(collection(db, "trips",tripId,"hotels"), hotelInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { addHotel, addDestination, error };
};

export default useNestedCollection;
