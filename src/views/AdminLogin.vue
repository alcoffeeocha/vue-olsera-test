<template>
  <h1>Admin Login</h1>
  <form @submit.prevent="handleSubmit">
    <label for="user-id">Enter your user id</label>
    <input type="text" id="user-id" v-model.lazy="input.userId" required />
    <label for="user-email">Enter your user email</label>
    <input
      type="text"
      id="user-email"
      v-model.lazy="input.userEmail"
      required
    />
    <button type="submit" placeholder="Login">Login</button>
  </form>
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
