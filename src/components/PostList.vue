<template>
  <h1>List</h1>
  <ul>
    <PostItem :post="post" v-for="post in posts" :key="post.id" />
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
  },
};
</script>
