import { ref } from "vue";
import { db } from "../../firebase/config";
import {
  doc,
  getDocs,
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

// console.log("in query firestore is ", db);

const queryCollectionById = () => {
  const error = ref(null);
  const documents = ref([]);
  const comments = ref([]);
  const likes = ref([])
  const loading = ref(false)
  const clicks = ref([])

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
      // console.log("Current trips: ", trips.join(", "));
    });
  };

  const loadTripsCollection = async () => {
    loading.value = false
    // console.log("in get collection");
    // console.log("db is ", db);
    // let collectionRef = collection(db, collectionName)
    const q = query(collection(db, "trips"), orderBy("createdAt") );

    // const querySnapshot = await getDocs(q);
    onSnapshot(q, (querySnapshot) => {
      const trips = [];
      documents.value = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data().name);
        documents.value.push([doc.id, doc.data()]);
      });
      // console.log("ALL TRIPS: ", trips.join(", "));
      loading.value = true
    });
  };

  const loadClicksCollection = async () => {
    loading.value = false
    console.log("in get click collection");
    // console.log("db is ", db);
    // let collectionRef = collection(db, collectionName)
    const q = query(collection(db, "clicks"), orderBy("createdAt") );

    // const querySnapshot = await getDocs(q);
    onSnapshot(q, (querySnapshot) => {
      const tesClick = [];
      clicks.value = [];
      querySnapshot.forEach((doc) => {
        tesClick.push(doc.data().name);
        clicks.value.push([doc.id, doc.data()]);
      });
      console.log("ALL tesClick: ", tesClick.join(", "));
      loading.value = true
    });
  };

  const loadCommentsCollection = async (tripId) => {
    // console.log("in comments collection, tripId is", tripId);
    // console.log("db is ", db);
    // let collectionRef = collection(db, collectionName)
    // const q = query(
    //   collection(db, "comments"),
    //   where("tripId", "==", tripId),
    //   orderBy("createdAt")
    // );
    const q = query(collection(db, "comments"), orderBy("createdAt"));

    // const querySnapshot = await getDocs(q);
    onSnapshot(q, (querySnapshot) => {
      const tesComments = [];
      comments.value = [];
      querySnapshot.forEach((doc) => {
        tesComments.push(doc.data().commentorName);
        comments.value.push([doc.id, doc.data()]);
      });
      console.log("ALL COMMENTS: ", tesComments.join(", "));
      console.log("DOC DATA HERE IS", comments.value);
    });
    // const snapshot = await getCountFromServer(q);

    // // const coll = collection(db, "cities");
    // // const query_ = query(coll, where("state", "==", "CA"));
    // console.log("COUNT OF COMMENTS IS: ", snapshot.data().count);
  };

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());

  //   // console.log("documents in collection is,",documents)
  // });
  const loadLikesCollection = async (tripId) => {
   
    const q = query(collection(db, "likes"), where("tripId", "==", tripId));

    // const querySnapshot = await getDocs(q);
    onSnapshot(q, (querySnapshot) => {
      const teslikes = [];
      likes.value = [];
      querySnapshot.forEach((doc) => {
        teslikes.push(doc.data().likerName);
        likes.value.push( doc.data());
      });
      console.log("ALL COMMENTS: ", teslikes.join(", "));
      console.log("DOC DATA HERE IS", likes.value);
    });
    // const snapshot = await getCountFromServer(q);
    // // const coll = collection(db, "cities");
    // // const query_ = query(coll, where("state", "==", "CA"));
    // console.log("COUNT OF COMMENTS IS: ", snapshot.data().count);
  };

  return {
    clicks,
    loadClicksCollection,
    likes,
    documents,
    error,
    comments,
    loadCollection,
    loadTripsCollection,
    loadCommentsCollection,
    loadLikesCollection,
    loading
  };
};

export default queryCollectionById;
