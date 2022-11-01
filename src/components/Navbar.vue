<template>
  <nav
    class="navbar navbar-expand sticky-top"
    style="background-color: #e3f2fd"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click="goHome">Escape</a>
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
        <template v-if="user">
          <li class="nav-item">
            <div class="dropdown">
              <a
                class="btn border rounded-pill"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="navbar-toggler-icon"></span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end mt-2">
                <li>
                  <a class="dropdown-item" href="#" @click="openProfilePage"
                    >Your Trips</a
                  >
                </li>
                <hr />
                <li>
                  <a class="dropdown-item" href="#" @click="handleClick">
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
                <span class="navbar-toggler-icon"></span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end mt-2">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <hr />
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
      }
    };

    const openProfilePage = () => {
      router.push({ name: "Profile" });
    };

    const goHome = () => {
      console.log("going home");
      router.push({ name: "Home" });
    };

    return {
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
<style></style>
