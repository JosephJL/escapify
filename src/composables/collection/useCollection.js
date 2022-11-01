import { collection, addDoc } from "firebase/firestore";
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

  return { addDocument, error };
};

export default useCollection;
