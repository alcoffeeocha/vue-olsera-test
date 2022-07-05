import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

import TheHeader from "@/components/TheHeader.vue";
import VisitorHome from "@/views/VisitorHome.vue";

const PostDetail = () => import("@/components/PostDetail.vue");
const PostUpdate = () => import("@/components/PostUpdate.vue");
const VisitorLikedPosts = () => import("@/views/VisitorLikedPosts.vue");
const AdminHome = () => import("@/views/AdminHome.vue");
const AdminLogin = () => import("@/views/AdminLogin.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/posts",
  },
  {
    path: "/posts",
    name: "posts",
    components: {
      header: TheHeader,
      default: VisitorHome,
    },
    children: [
      // show post detail by id
      {
        path: ":id",
        name: "post",
        component: PostDetail,
        props: true,
      },
    ],
  },
  {
    path: "/liked-posts",
    name: "liked-posts",
    components: {
      header: TheHeader,
      default: VisitorLikedPosts,
    },
  },
  {
    path: "/admin",
    name: "admin",
    components: {
      header: TheHeader,
      default: AdminHome,
    },
    children: [
      {
        // show post detail by id
        path: "posts/:id",
        name: "admin-post-id",
        component: PostDetail,
        props: true,
      },
      {
        // create new post
        path: "create",
        name: "admin-create",
        component: PostUpdate,
      },
      {
        // edit post by id
        path: "posts/:id/edit",
        name: "admin-edit",
        component: PostUpdate,
        props: true,
      },
    ],
    beforeEnter: () => {
      if (!store.getters.isAdmin) {
        return {
          name: "login",
        };
      }
      return true;
    },
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: AdminLogin,
    },
    beforeEnter: () => {
      if (store.getters.isAdmin) {
        return {
          name: "admin",
        };
      }
      return true;
    },
  },
  {
    path: "/:notFound(.*)",
    name: "404",
    components: {
      header: TheHeader,
      default: NotFound,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-menu",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;
