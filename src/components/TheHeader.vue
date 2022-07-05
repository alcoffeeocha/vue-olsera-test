<template>
  <h1>Header</h1>
  <button @click="handleLogout">Logout</button>
</template>

<script>
export default {
  name: "TheHeader",
  methods: {
    handleLogout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
  },
};
</script>
