<template>
  <BaseModal @close="closeModal">
    <template #header>
      <h1>{{ id ? "Update" : "Create New" }} Post</h1>
    </template>
    <template #default>
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
        <input
          :disabled="loading"
          type="text"
          v-model.lazy="input.body"
          required
        />
        <input type="submit" hidden />
      </form>
    </template>
    <template #footer>
      <button v-if="id" class="danger" @click.prevent="onDeletePost">
        DELETE
      </button>
      <button
        :class="{
          transparent: createMode,
        }"
        @click="handleSubmit"
      >
        SAVE
      </button>
    </template>
  </BaseModal>
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
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.getPostById(newId);
      }
    },
  },
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
      this.closeModal();
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
    onDeletePost() {
      if (window.confirm("are you sure?")) {
        this.$emit("deletePost", this.id);
      }
    },
    closeModal() {
      this.$router.push({
        name: "admin",
      });
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

<style scoped>
form {
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
}
label {
  font-weight: 600;
  font-size: larger;
}
input {
  outline: none;
  border: none;
  border-bottom: 1px solid black;
}
</style>
