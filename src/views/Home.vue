<template>
    <div class="homecontainer">
        <p>Home screen here</p>
        <div v-if="showLogin">
            <h2>Login</h2>
            <LoginForm @login="enterMain" />
            <p>No account yet? <span @click="showLogin = false">Signup </span>instead</p>
        </div>
        <div v-else>
            <h2>Sign up</h2>
            <SignUpForm @signup="enterMain" />
            <p>Already registered? <span @click="showLogin = true">Login </span>instead</p>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'
import {useRouter} from 'vue-router'
import MainPage from '../views/MainPage.vue'


export default {
    components:{SignUpForm, LoginForm},

    setup() {
        const showLogin = ref(true)
        const router = useRouter()

        const enterMain = () => {
            router.push({path: '/mainPage'})
        }

        return {showLogin, enterMain}
    }
}
</script>
