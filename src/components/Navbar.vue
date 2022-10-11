<template>
  <nav v-if="user">
    <div>
      <p>Hey there {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <button @click="handleClick">logout</button>
  </nav>
  <nav v-else class="navbar navbar-expand-lg" style="background-color: #e3f2fd">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Escape</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Country', params: { name: 'Australia' } }"
              class="btn btn-info"
              >Country</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Destination</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { logout, error } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("user logged out");
      }
    };

    return { logout, error, handleClick, user, router };
  },
};
</script>
<style></style>
