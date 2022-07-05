import req from "@/request";
export default {
  async getPosts({ commit }, config = {}) {
    try {
      const postsResponse = await req.get("posts", config);
      const posts = await postsResponse.data;
      console.log(posts);
      commit("SET_POSTS", posts);
      return posts;
    } catch (err) {
      return new Error(err);
    }
  },
  createNewPost({ commit }, post) {
    commit("INSERT_POST", post);
  },
  editPost({ commit }, post) {
    commit("UPDATE_POST", post);
  },
  deletePost({ commit }, postId) {
    commit("REMOVE_POST", postId);
  },
};
