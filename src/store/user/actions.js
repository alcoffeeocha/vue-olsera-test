import req from "@/request";
export default {
  login({ commit }, { userId, userEmail }) {
    return new Promise((resolve, reject) => {
      req
        .get("users/" + userId)
        .then((res) => {
          const user = res.data;
          if (user.email !== userEmail) {
            reject("invalid email");
          } else {
            localStorage.setItem("fake_userId", user.id);
            localStorage.setItem("fake_userEmail", user.email);
            commit("SET_USER", {
              userId,
              userEmail,
            });
            resolve(user);
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 404) {
            reject("user id not found");
          } else {
            reject("something went wrong");
          }
        });
    });
  },
  logout({ commit }) {
    localStorage.removeItem("fake_userId");
    localStorage.removeItem("fake_userEmail");
    commit("SET_USER", {
      userId: "",
      userEmail: "",
    });
  },
  likePost({ commit }, postId) {
    commit("ADD_LIKED_POST", postId);
  },
  dislikePost({ commit }, postId) {
    commit("REMOVE_LIKED_POST", postId);
  },
};
