import { createApp } from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store/index";
import request from "@/request";
import PostList from "@/components/PostList.vue";

const app = createApp(App);

app.use(router).use(store);

app.component("PostList", PostList);

app.provide("req", request);

app.mount("#app");
