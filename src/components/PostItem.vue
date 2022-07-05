<template>
  <li>
    <p @click="$emit('postClicked', post.id)">
      {{ post.title + " " + post.id }}
    </p>
    <button v-if="likeable" @click="toggleLikePost">
      {{ likedPost ? "Dislike" : "Like" }}
    </button>
  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
    likeable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ["postClicked"],
  computed: {
    ...mapGetters(["likedPostsId"]),
    likedPost() {
      return this.likedPostsId.includes(parseInt(this.post.id));
    },
  },
  methods: {
    ...mapActions(["likePost", "dislikePost"]),
    toggleLikePost() {
      const postId = parseInt(this.post.id);
      if (!this.likedPost) {
        this.likePost(postId);
      } else {
        this.dislikePost(postId);
      }
    },
  },
};
</script>
