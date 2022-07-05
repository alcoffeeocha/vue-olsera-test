<template>
  <h1>Admin Home</h1>
  <p v-if="loading && !posts">Showing Posts...</p>
  <PostList
    :likeable="false"
    :cta="editPost"
    v-else-if="Array.isArray(posts) && posts.length > 0"
    :posts="posts"
  />
  <p v-else>You have not created any post</p>
  <button
    @click="
      $router.push({
        name: 'admin-create',
      })
    "
  >
    Add Post
  </button>
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
          const getPostsResponse = await this.req.get(
            `posts?userId=${this.userId}&_page=${page}&_limit=${limit}`
          );
          const newPosts = await getPostsResponse.data;
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
    async handleUpdatePost({ id, title, body }) {
      const newerPost = {
        userId: this.userId,
        title: title,
        body: body,
      };

      if (id) {
        try {
          const updatePostResponse = await this.req.put(
            "posts/" + id,
            newerPost
          );
          if (
            updatePostResponse.status >= 200 &&
            updatePostResponse.status < 204
          ) {
            const updatedPost = await updatePostResponse.data;
            const postToBeUpdated = this.posts.find((post) => {
              return parseInt(post.id) === parseInt(id);
            });
            Object.assign(postToBeUpdated, updatedPost);
          } else {
            throw new Error("update post failed");
          }
        } catch (err) {
          alert(err.message);
        }
      } else {
        try {
          const createPostResponse = await this.req.post("posts", newerPost);
          if (
            createPostResponse.status >= 200 &&
            createPostResponse.status < 204
          ) {
            const createdPost = await createPostResponse.data;
            this.posts.unshift({ ...createdPost, id: new Date().valueOf() });
          } else {
            throw new Error("create post failed");
          }
        } catch (err) {
          alert(err.message);
        }
      }
    },
    async handleDeletePost(id) {
      try {
        const deletePostResponse = await this.req.delete("posts/" + id);
        if (
          deletePostResponse.status >= 200 &&
          deletePostResponse.status < 204
        ) {
          this.posts.splice(
            this.posts.findIndex((post) => {
              return parseInt(post.id) === parseInt(id);
            }),
            1
          );
        } else {
          throw new Error("delete post failed");
        }
      } catch (err) {
        alert(err.message);
      }
      this.$router.replace({
        name: "admin",
      });
    },
    editPost(id) {
      this.$router.push({
        name: "admin-edit",
        params: {
          id,
        },
      });
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
