<template>
  <h1>Visitor Home</h1>
  <p v-if="loading && !posts">Showing posts...</p>
  <PostList
    v-else-if="Array.isArray(posts) && posts.length > 0"
    :posts="posts"
  />
  <p v-else>There are no posts right now</p>
  <button v-if="!noMorePost" @click="loadMorePosts">More</button>
  <router-view></router-view>
  <router-link :to="{ name: 'admin' }">Admin</router-link>&nbsp;
  <router-link :to="{ name: 'liked-posts' }">Liked Posts</router-link>
</template>

<script>
export default {
  name: "VisitorHome",
  data: () => ({
    posts: null,
    loading: false,
    currentPage: 1,
    noMorePost: false,
  }),
  inject: ["req"],
  methods: {
    async getPosts({ page, limit = 5 }) {
      if (!this.noMorePost) {
        try {
          this.loading = true;
          const postsResponse = await this.req.get(
            `posts?_page=${page}&_limit=${limit}`
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
      }
      this.loading = false;
    },
    loadMorePosts() {
      this.currentPage = this.currentPage + 1;
      this.getPosts({
        page: this.currentPage,
      });
    },
  },
  mounted() {
    this.getPosts({
      page: this.currentPage,
    });
  },
};
</script>
