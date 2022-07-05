<template>
  <header>
    <div class="left">
      <button
        v-if="$store.getters.isAdmin && $route.name !== 'admin'"
        @click="
          $router.push({
            name: 'admin',
          })
        "
      >
        Admin
      </button>
      <button
        v-else-if="$route.name !== 'posts'"
        @click="
          $router.push({
            name: 'posts',
          })
        "
      >
        Visitor
      </button>
      <img
        style="cursor: pointer"
        src="@/assets/heart-solid-white.svg"
        width="30"
        alt="Liked Posts"
        @click="
          $router.push({
            name: 'liked-posts',
          })
        "
      />
    </div>
    <div class="right">
      <button v-if="$store.getters.isAdmin" @click="handleLogout">
        Logout
      </button>
      <button
        v-else
        @click="
          $router.push({
            name: 'login',
          })
        "
      >
        Login
      </button>
    </div>
  </header>
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

<style scoped>
header {
  color: white;
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  column-gap: 1rem;
  align-items: center;
}
</style>
