<template>
  <header class="header">
    <div class="container">
      <router-view name="header"></router-view>
    </div>
  </header>
  <div class="container">
    <router-view></router-view>
  </div>
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

<style>
li {
  list-style: none;
}
.header {
  background-color: var(--primary-color);
}
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}
main {
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0 2rem;
}
button {
  padding: 0.7em 2.2em;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: none;
  background-color: var(--primary-color);
  color: white;
}
button.secondary {
  background-color: white;
  color: black;
}
button.transparent {
  background-color: transparent;
  color: black;
}
button.danger {
  background-color: maroon;
  color: white;
}
a {
  text-decoration: none;
  font-size: 1.4rem;
  color: var(--primary-color);
}
</style>
