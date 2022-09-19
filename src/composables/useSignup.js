import {ref} from "vue"
import { getAuth ,createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const error = ref(null)

const signup = async (email, password, displayName) => {
    const auth = getAuth()
    error.value = null
    console.log("auth is" + auth)

    try{
        const res = await createUserWithEmailAndPassword(auth,email,password)
        if (!res){
            throw new Error('Could not complete the signup')
        }
        await updateProfile(auth.currentUser,{displayName})
        error.value = null
        console.log(res)
        
        return res
    } catch(err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    return {error, signup}
}

export default useSignup