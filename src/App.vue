<template>
  <router-view name="header"></router-view>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
  beforeCreate() {
    const uid = localStorage.getItem("fake_userId");
    const userEmail = localStorage.getItem("fake_userEmail");
    if (uid && userEmail) {
      this.$store.dispatch("login", {
        userId: uid,
        userEmail: userEmail,
      });
    }
  },
};
</script>

<style></style>
