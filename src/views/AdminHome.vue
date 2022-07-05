<template>
  <h1>Admin Home</h1>
  <p v-if="loading && !posts">Showing Posts...</p>
  <PostList
    v-else-if="Array.isArray(posts) && posts.length > 0"
    :posts="posts"
  />
  <p v-else>You have not created any post</p>
  <button v-if="!noMorePost" @click="loadMorePosts">More</button>
  <router-link to="/">Visitor Page</router-link>
  <router-view
    @updatePost="handleUpdatePost"
    @deletePost="handleDeletePost"
  ></router-view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdminHome",
  data: () => ({
    posts: null,
    loading: false,
    currentPage: 1,
    noMorePost: false,
  }),
  inject: ["req"],
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    async getAdminPosts({ page, limit = 5 }) {
      if (!this.noMorePost) {
        try {
          this.loading = true;
          const postsResponse = await this.req.get(
            `posts?userId=${this.userId}&_page=${page}&_limit=${limit}`
          );
          const newPosts = await postsResponse.data;
          if (newPosts.length === 0) {
            this.noMorePost = true;
          }
          if (Array.isArray(this.posts)) {
            newPosts.forEach((post) => {
              this.posts.push(post);
            });
          } else {
            this.posts = newPosts;
          }
        } catch (err) {
          console.log(err);
        }
        this.loading = false;
      }
    },
    loadMorePosts() {
      this.currentPage = this.currentPage + 1;
      this.getAdminPosts({
        page: this.currentPage,
      });
    },
    handleUpdatePost({ id, title, body }) {
      const newerPost = {
        userId: this.userId,
        id: parseInt(id) || Date.now(),
        title: title,
        body: body,
      };
      if (id) {
        const postToBeUpdated = this.posts.find((post) => {
          return parseInt(post.id) === newerPost.id;
        });
        Object.assign(postToBeUpdated, newerPost);
      } else {
        this.posts.unshift(newerPost);
      }
    },
    handleDeletePost(id) {
      this.posts.splice(
        this.posts.findIndex((post) => {
          return parseInt(post.id) === parseInt(id);
        }),
        1
      );
    },
  },
  mounted() {
    const welcome = this.$route.query.welcome;
    if (welcome) {
      console.log("Welcome back, " + welcome);
    }
    this.getAdminPosts({
      page: this.currentPage,
    });
  },
};
</script>
