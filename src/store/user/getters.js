export default {
  userId(state) {
    return state.userId;
  },
  userEmail(state) {
    return state.userEmail;
  },
  isAdmin(state) {
    return !!state.userId;
  },
  likedPostsId(state) {
    return state.likedPostsId;
  },
};
