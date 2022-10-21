<template>
  <div class="card mx-auto text-start p-3 col-md-5 col-lg-4 my-auto">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <h1 class="fw-bold">Sign Up Here</h1>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          required
          placeholder="Enter Username"
          v-model="displayName"
        />
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          required
          placeholder="Enter Email"
          v-model="email"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Passcode"
        />
        <div class="error">
          {{ error }}
        </div>
      </div>
      <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
      </div>
    </form>
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignup from "../../composables/useSignup";

export default {
  setup(props, context) {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const { error, signup } = useSignup();

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        context.emit("signup");
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>
