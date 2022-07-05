import { createStore } from "vuex";
import UserModule from "./user/index";
import PostsModule from "./posts/index";

const store = createStore({
  modules: {
    user: UserModule,
    posts: PostsModule,
  },
});

export default store;
