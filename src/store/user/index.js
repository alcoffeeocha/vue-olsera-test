import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

export default {
  namespaced: false,
  state: () => ({
    userId: localStorage.getItem("fake_userId") || "",
    userEmail: localStorage.getItem("fake_userEmail") || "",
    likedPostsId: localStorage.getItem("fake_likedPostsId") || [],
  }),
  getters,
  actions,
  mutations,
};
