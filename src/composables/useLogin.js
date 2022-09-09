import {ref} from "vue"
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword } from "firebase/auth";


const error = ref(null)

const login = async(email,password) => {

}

const useLogin = () => {
    return {error, login}
} 

export default useLogin