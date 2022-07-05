export default {
  SET_USER(state, { userId, userEmail }) {
    state.userId = userId;
    state.userEmail = userEmail;
  },
  ADD_LIKED_POST(state, postId) {
    state.likedPostsId.push(postId);
    localStorage.setItem(
      "fake_likedPostsId",
      JSON.stringify(state.likedPostsId)
    );
  },
  REMOVE_LIKED_POST(state, postId) {
    const postIdxToBeRemoved = state.likedPostsId.indexOf(postId);
    if (postIdxToBeRemoved !== -1) {
      state.likedPostsId.splice(postIdxToBeRemoved, 1);
      localStorage.setItem(
        "fake_likedPostsId",
        JSON.stringify(state.likedPostsId)
      );
    }
  },
};
