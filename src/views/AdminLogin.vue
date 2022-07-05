<template>
  <section class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <label for="user-id">Enter your user id</label>
      <input type="text" id="user-id" v-model.lazy="input.userId" required />
      <label for="user-email">Enter your email</label>
      <input
        type="text"
        id="user-email"
        v-model.lazy="input.userEmail"
        required
      />
      <div class="login__action">
        <button
          class="secondary"
          @click.prevent="
            $router.push({
              name: 'posts',
            })
          "
          placeholder="Cancel"
        >
          Cancel
        </button>
        <button type="submit" placeholder="Login">Login</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      input: {
        userId: 1,
        userEmail: "Sincere@april.biz",
      },
    };
  },
  methods: {
    handleSubmit() {
      const uid = this.input.userId;
      const email = this.input.userEmail;
      if (uid && email) {
        this.$store
          .dispatch("login", {
            userId: uid,
            userEmail: email,
          })
          .then((data) => {
            this.$router.replace({
              name: "admin",
              query: {
                welcome: data.username,
              },
            });
          })
          .catch((e) => {
            alert(e);
          });
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
}
.login {
  padding: 1.6rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  max-width: 400px;
  width: 90vw;
  margin: 10vh auto 0;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
}
form input {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}
form label {
  font-weight: 600;
  font-size: larger;
}
.login__action {
  display: flex;
  margin-top: 2rem;
  justify-content: flex-end;
  column-gap: 0.6rem;
}
</style>
