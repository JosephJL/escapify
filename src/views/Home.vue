<template>
  <div class="homecontainer">
    <p>Home screen here</p>
  </div>
</template>

<script>
import { ref } from "vue";
import SignUpForm from "../components/auth/SignUpForm.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import { useRouter } from "vue-router";
import MainPage from "../views/MainPage.vue";

export default {
  components: { SignUpForm, LoginForm },

  setup() {
    const showLogin = ref(true);
    const router = useRouter();

    const enterMain = () => {
      router.push({ path: "/mainPage" });
    };

    return { showLogin, enterMain };
  },
};
</script>
