import { ref } from "vue";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

const user = ref(auth.currentUser);
onAuthStateChanged(auth, (_user) => {
  // console.log('User state change. Current user is: ',user)
  user.value = _user;
});
const getUser = () => {
  return { user };
};

export default getUser;
