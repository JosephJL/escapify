<template>
    <div class="container">
        <Navbar />
        <div>
            Main Page here
        </div>
        <NewRecipeForm />
    </div>
</template>

<script>
import NewRecipeForm from '../components/NewRecipeForm.vue'
import MealList from '../components/MealList.vue'
import Navbar from '../components/Navbar.vue'
import getUser from '../composables/getUser'
import {watch,ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

export default {
    components:{Navbar,NewRecipeForm,MealList},

    setup() {
        const { user } = getUser()
        const router = useRouter()

        watch(user, () => {
            if (!user.value){
                router.push({name:'Home'})
            }
        })

        return {}
    }
}
</script>
