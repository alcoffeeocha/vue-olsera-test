<template>
  <li class="card" @click="$emit('postClicked', post.id)">
    <div class="card__content">
      <h2>
        {{ post.title }}
      </h2>
      <p>{{ post.body }}</p>
    </div>
    <img
      class="card__heart"
      v-if="likeable"
      :src="likedPost ? likeIcon[1] : likeIcon[0]"
      width="30"
      alt="Heart Icon"
      @click.stop="toggleLikePost"
    />
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
  data() {
    return {
      likeIcon: [
        require("@/assets/heart.svg"),
        require("@/assets/heart-solid.svg"),
      ],
    };
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

<style scoped>
img {
  cursor: pointer;
}

.card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 5px;
  padding: 1rem 2rem;
  justify-content: space-between;
  cursor: pointer;
}

.card__content {
  flex-basis: 80%;
}
</style>
