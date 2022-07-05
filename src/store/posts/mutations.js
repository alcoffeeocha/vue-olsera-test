export default {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  INSERT_POST(state, post) {
    state.posts.push(post);
  },
  UPDATE_POST(state, newerPost) {
    let postToBeUpdated = state.posts.find((oldPost) => {
      return oldPost.id === newerPost.id;
    });
    if (postToBeUpdated) {
      postToBeUpdated = newerPost;
      return;
    }
  },
  REMOVE_POST(state, postId) {
    state.posts.every((post, idx) => {
      if (post.id === postId) {
        state.posts.splice(idx, 1);
        return false;
      }
      return true;
    });
  },
};
