<template>
  <div class="card p-3 text-center">
    <form @submit.prevent="handleSubmit">
      <slot name="close"></slot>
      <div class="mb-3">
        <span class="fs-5 fw-bold">Sign Up</span>
        <hr style="margin: 15px -20px 20px" />
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
          v-model="password"
        />
        <div id="emailHelp" class="form-text">Minimum Six Characters</div>
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

    console.log("email/pw is", email, password);

    const { error, signup } = useSignup();

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        context.emit("signup");
        window.location.reload();
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>
