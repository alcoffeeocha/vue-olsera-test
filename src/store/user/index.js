import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

let likedPostsId = localStorage.getItem("fake_likedPostsId");
if (likedPostsId) {
  likedPostsId = JSON.parse(likedPostsId);
}

export default {
  namespaced: false,
  state: () => ({
    userId: localStorage.getItem("fake_userId") || "",
    userEmail: localStorage.getItem("fake_userEmail") || "",
    likedPostsId: likedPostsId || [],
  }),
  getters,
  actions,
  mutations,
};
