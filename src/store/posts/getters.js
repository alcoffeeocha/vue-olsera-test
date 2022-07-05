export default {
  allPosts(state) {
    return state.posts;
  },
  postByAdmin(state, getters, rootState, rootGetters) {
    if (rootGetters.userId) {
      return state.posts.filter((post) => {
        post.userId === rootGetters.userId;
      });
    }
    return getters.allPosts;
  },
  likedPosts(state, getters) {
    let likedPostsId = localStorage.getItem("fake_likedPostsId");
    if (likedPostsId && getters.allPosts.length > 0) {
      likedPostsId = JSON.parse(likedPostsId);
      const posts = state.posts.filter((post) => {
        return likedPostsId.includes(post.id);
      });
      return posts;
    }
    return [];
  },
};
