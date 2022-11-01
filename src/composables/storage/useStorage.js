import {storage} from "../../firebase/config"
import {ref} from "../firebase/config"

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    return {url ,filePath, error}
}