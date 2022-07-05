<template>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <h3>Title</h3>
    <p>{{ title }}</p>
    <h3>Body</h3>
    <p>{{ body }}</p>
  </div>
  <router-link to="/">Posts List</router-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PostDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  inject: ["req"],
  data: () => ({
    title: "",
    body: "",
    loading: true,
  }),
  computed: {
    ...mapGetters(["isAdmin"]),
  },
  methods: {
    async getPostById(id) {
      try {
        const postResponse = await this.req.get("posts/" + id);
        const postData = postResponse.data;
        this.title = postData.title;
        this.body = postData.body;
      } catch (err) {
        if (this.isAdmin) {
          this.$router.replace({
            name: "admin",
          });
        } else {
          this.$router.replace({
            name: "posts",
          });
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getPostById(this.id);
  },
};
</script>
