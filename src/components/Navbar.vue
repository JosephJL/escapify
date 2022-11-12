<style>
@media screen and (min-width: 401px) {
  #logo {
    width: 120px;
  }
}

@media screen and (max-width: 400px) {
  #logo {
    width: 90px;
  }
}

@media screen and (min-width: 451px) {
  #logo {
    width: 150px;
  }
}

#logo {
  height: auto;
}
</style>

<template>
  <nav
    class="navbar navbar-expand bg-dark sticky-top"
    style="background-color: #dfe9f5; --bs-bg-opacity: 0.98"
  >
    <!-- old color #e3f2fd  -->
    <div class="container-fluid">
      <a class="navbar-brand text-white p-0" href="#" @click.prevent="goHome">
        <img
          id="logo"
          src="../assets/img/Escapify-logos/Escapify-white.png"
          alt=""
        />
      </a>
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->

      <ul class="navbar-nav ms-auto mb-0">
        <!-- dropdown when user is logged in -->
        <a class="navbar-brand text-white" href="#" @click.prevent="goHome"
          ><span style="font-size: 16px" class="wordLink">Discover</span></a
        >
        <a
          class="navbar-brand text-white"
          href="#"
          @click.prevent="openCommunityPage"
          ><span style="font-size: 16px" class="wordLink">Community</span></a
        >
        <template v-if="user">
          <li class="nav-item text-white">
            <div class="dropdown">
              <a
                class="btn border rounded-pill d-flex"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div>
                  <span class="navbar-toggler-icon navbar-dark me-2"></span>
                </div>
                <div class="text-light">
                  <svg
                    v-if="user"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    />
                  </svg>
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end mt-2">
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="openProfilePage"
                    >Your Trips</a
                  >
                </li>
                <hr />
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="handleClick"
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </template>

        <!-- dropdown when user is not logged in -->
        <template v-else>
          <li class="nav-item">
            <div class="dropdown">
              <a
                class="btn border rounded-pill"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="navbar-toggler-icon navbar-dark"></span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end mt-2">
                <li>
                  <button
                    type="button"
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="showLogin = true"
                  >
                    Log In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="showLogin = false"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </nav>

  <!-- modal component for use signup / login -->
  <Teleport to="body">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <LoginForm v-if="showLogin">
            <template v-slot:close>
              <button
                type="button"
                class="btn-close float-end"
                data-bs-dismiss="modal"
              />
            </template>
            <p class="mt-3">
              No account yet?
              <span class="fw-bold" @click="showLogin = false">Sign Up</span>
              instead
            </p>
          </LoginForm>
          <SignUpForm v-if="!showLogin">
            <template v-slot:close>
              <button
                type="button"
                class="btn-close float-end"
                data-bs-dismiss="modal"
              />
            </template>
            <p class="mt-3">
              Already have an account?
              <span class="fw-bold" @click="showLogin = true">Login</span>
              instead
            </p>
          </SignUpForm>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import { ref } from "vue";
import LoginForm from "../components/auth/LoginForm.vue";
import SignUpForm from "../components/auth/SignUpForm.vue";

export default {
  components: { LoginForm, SignUpForm },
  setup() {
    const { logout, error } = useLogout();
    const { user } = getUser();
    const router = useRouter();
    const showLogin = ref(true);

    // const toggleModal = () => {
    //   console.log("in toggleModal");
    //   showModal.value = !showModal.value;
    // };

    const handleClick = async () => {
      console.log("hello hello helloooo");
      await logout();
      if (!error.value) {
        console.log("user logged out");
        window.location.reload();
      }
    };

    const openProfilePage = () => {
      router.push({ name: "Profile" });
    };

    const openCommunityPage = () => {
      console.log("going community");
      router.push({ name: "Community" });
    };

    const goHome = () => {
      console.log("going home");
      router.push({ name: "Home" });
    };

    return {
      openCommunityPage,
      logout,
      error,
      handleClick,
      user,
      router,
      showLogin,
      openProfilePage,
      goHome,
    };
  },
};
</script>
