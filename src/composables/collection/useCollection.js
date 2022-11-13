import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
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

  const addComment = async (commentInfo) => {
    error.value = null;
    try {
      await addDoc(collection(db, "comments"), commentInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const setLike = async (likeInfo, tripId, userId) => {
    console.log("reached add like", likeInfo);
    const likesRef = doc(db, "likes", tripId + userId);
    error.value = null;
    try {
      await setDoc(likesRef, likeInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const delDocument = async (tripId) => {
    // console.log("reached del destination!, data received is ", tripId);
    error.value = null;
    try {
      await deleteDoc(doc(db, "trips", tripId));
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const updateDocument = async (tripId, value, text) => {
    // console.log("reached update doc value received is", value);
    error.value = null;
    const docRef = doc(db, "trips", tripId);
    try {
      await updateDoc(docRef, {
        shareStatus: value,
        postInfo: text,
        createdAt: Timestamp.now().toDate(),
      });
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const addClick = async (countryInfo, name, userId) => {
    console.log("reached add click", countryInfo);
    const likesRef = doc(db, "clicks", name + userId);
    error.value = null;
    try {
      await setDoc(likesRef, countryInfo);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return {
    addClick,
    addDocument,
    error,
    delDocument,
    updateDocument,
    addComment,
    setLike,
  };
};

export default useCollection;
