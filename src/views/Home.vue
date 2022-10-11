<template>
  <div>
    <Navbar />
    <p>Home screen here</p>
    <div class="container bg-light">
      <CountryList :list="countryKeys" />
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
// import SignUpForm from "../components/auth/SignUpForm.vue";
// import LoginForm from "../components/auth/LoginForm.vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import countries from "countries-list";
import CountryList from "../components/CountryList.vue";

export default {
  components: { Navbar, CountryList },

  setup() {
    const router = useRouter();

    const countryKeys = Object.values(countries.countries);
    // const enterMain = () => {
    //   router.push({ path: "/mainPage" });
    // };
    console.log(countries.countries[Object.keys(countries.countries)[0]]);
    console.log(Object.keys(countries.countries).length);

    return { countryKeys };
  },
};
</script>
