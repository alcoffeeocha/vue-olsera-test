<template>
  <p v-if="waitOnPost">Loading...</p>
  <div v-else-if="!waitOnPost">
    <h3>Title</h3>
    <p>{{ post.title }}</p>
    <h3>Body</h3>
    <p>{{ post.body }}</p>
    <div>
      <h3>Comments</h3>
      <p v-if="postReady && waitOnComment">Load comments...</p>
      <ul v-else-if="!waitOnComment && commentsReady">
        <li v-for="comment in comments" :key="comment.id">
          <h4>{{ comment.name }}</h4>
          <p>comment: {{ comment.body }}</p>
        </li>
      </ul>
      <p v-else-if="commentsReady">No comment for this post.</p>
      <button v-if="!noMoreComment" @click="loadMoreComments">More</button>
    </div>
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
    post: {
      title: "",
      body: "",
    },
    comments: null,
    currentCommentPage: 1,
    waitOnPost: true,
    waitOnComment: true,
    noMoreComment: false,
  }),
  computed: {
    ...mapGetters(["isAdmin"]),
    postReady() {
      return !Object.values(this.post).every((x) => x === null || x === "");
    },
    commentsReady() {
      return (
        !this.waitOnComment &&
        Array.isArray(this.comments) &&
        this.comments.length > 0
      );
    },
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.reset();
        this.getPostById();
      }
    },
  },
  methods: {
    async getPostById() {
      try {
        const getPostResponse = await this.req.get("posts/" + this.id);
        const post = getPostResponse.data;
        this.post.title = post.title;
        this.post.body = post.body;
        this.getPostComments({
          page: this.currentCommentPage,
        });
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
      this.waitOnPost = false;
    },
    async getPostComments({ page, limit = 5 }) {
      try {
        const getCommentsResponse = await this.req.get(
          `comments?postId${this.id}&_page=${page}&_limit=${limit}`
        );
        const comments = await getCommentsResponse.data;
        if (comments.length === 0) {
          this.noMoreComment = true;
        }
        if (Array.isArray(this.comments)) {
          comments.forEach((comment) => {
            this.comments.push(comment);
          });
        } else {
          this.comments = comments;
          this.waitOnComment = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    loadMoreComments() {
      this.currentCommentPage = this.currentCommentPage + 1;
      this.getPostComments({
        page: this.currentCommentPage,
      });
    },
    reset() {
      this.comments = null;
      this.waitOnComment = true;
      this.noMoreComment = false;
    },
  },
  mounted() {
    this.getPostById();
  },
};
</script>
