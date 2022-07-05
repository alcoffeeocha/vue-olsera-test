<template>
  <ul class="posts">
    <PostItem
      :post="post"
      :likeable="likeable"
      v-for="post in posts"
      :key="post.id"
      @postClicked="cta"
    />
  </ul>
</template>

<script>
import PostItem from "./PostItem.vue";

export default {
  name: "PostList",
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    likeable: {
      type: Boolean,
      required: false,
      default: true,
    },
    cta: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 0;
}

li:nth-child(even) {
  background-color: #eee;
}
</style>
