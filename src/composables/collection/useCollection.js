import { collection, addDoc,deleteDoc ,doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { ref } from "vue";

const useCollection = () => {
  const error = ref(null);

  const addDocument = async (tripInfo) => {
    error.value = null;
    try {
      await addDoc(collection(db, "trips"), tripInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const delDocument = async (tripId) => {
    console.log("reached del destination!, data received is ",tripId)
    error.value = null;
    try {
      await deleteDoc(doc(db, "trips",tripId));
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  }

  return { addDocument, error ,delDocument };
};

export default useCollection;
