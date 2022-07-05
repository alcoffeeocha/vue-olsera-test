<template>
  <main>
    <h1>Liked Posts</h1>
    <p v-if="loading">Showing Liked Posts...</p>
    <PostList
      :cta="toPostDetail"
      v-else-if="Array.isArray(likedPosts) && likedPosts.length > 0"
      :posts="likedPosts"
    />
    <p v-else>You have not like any post</p>
    <router-link style="margin: 0 auto" to="/">Check other posts</router-link>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "VisitorLikedPosts",
  inject: ["req"],
  data() {
    return {
      loading: true,
      likedPosts: null,
    };
  },
  watch: {
    likedPostsId: {
      deep: true,
      handler(newList) {
        this.likedPosts = this.likedPosts.filter((post) => {
          return newList.includes(parseInt(post.id));
        });
      },
    },
  },
  computed: {
    ...mapGetters(["likedPostsId"]),
  },
  methods: {
    async getLikedPosts() {
      const numOfLikedId = this.likedPostsId.length;
      if (numOfLikedId > 0) {
        try {
          const getPostsResponse = await this.req.get("posts");
          const posts = await getPostsResponse.data;
          const likedPosts = posts.filter((post) => {
            return this.likedPostsId.includes(post.id);
          });
          this.likedPosts = likedPosts;
          this.loading = false;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.likedPosts = [];
        this.loading = false;
      }
    },
    toPostDetail(id) {
      this.$router.push({
        name: "post",
        params: {
          id,
        },
      });
    },
  },
  mounted() {
    this.getLikedPosts();
  },
};
</script>
