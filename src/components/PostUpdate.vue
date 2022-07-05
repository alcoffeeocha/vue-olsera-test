<template>
  <h1>{{ id ? "Update" : "Create New" }} Post</h1>
  <form @submit.prevent="handleSubmit">
    <label for="title">Title</label>
    <input
      :disabled="loading"
      type="text"
      autofocus
      v-model.lazy="input.title"
      required
    />
    <label for="body">Body</label>
    <input :disabled="loading" type="text" v-model.lazy="input.body" required />
    <button v-if="id" @click="deletePost">DELETE</button>
    <button type="submit">SAVE</button>
  </form>
</template>

<script>
export default {
  name: "PostUpdate",
  props: {
    id: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["updatePost", "deletePost"],
  inject: ["req"],
  data: () => ({
    input: {
      title: "",
      body: "",
    },
    loading: true,
    createMode: true,
  }),
  methods: {
    clearInput() {
      this.input.title = "";
      this.input.body = "";
    },
    handleSubmit() {
      this.$emit("updatePost", {
        id: this.id,
        title: this.input.title,
        body: this.input.body,
      });
      if (this.createMode) {
        this.clearInput();
      }
    },
    deletePost() {
      this.$emit("deletePost", this.id);
      this.$router.replace({
        name: "admin",
      });
    },
    async getPostById(id) {
      try {
        const postResponse = await this.req.get("posts/" + id);
        const postData = postResponse.data;
        this.input.title = postData.title;
        this.input.body = postData.body;
        this.createMode = false;
      } catch (err) {
        this.$router.replace({
          name: "admin-create",
        });
      }
      this.loading = false;
    },
  },
  mounted() {
    if (this.id) {
      this.getPostById(this.id);
    } else {
      this.loading = false;
    }
  },
};
</script>
