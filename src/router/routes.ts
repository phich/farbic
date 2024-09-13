import type { RouteRecordRaw } from "vue-router";

// import { setToken, autoLogin, logout } from '@/api/user';
import AppLayout from "../layout/AppLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "/template",
        component: () => import("../views/template/index.vue"),
      },
      {
        path: "/products",
        component: () => import("../views/products/index.vue"),
      },
      {
        path: "/products/:id",
        component: () => import("../views/products/edit/index.vue"),
      },
    ],
  },
  // {
  //   path: '/',
  //   beforeEnter: async (to) => {
  //     // 自动登录功能
  //     if (to.query.username && to.query.key) {
  //       const res = await autoLogin({
  //         username: to.query.username,
  //         projectid: to.query.projectid,
  //         key: to.query.key,
  //       });
  //       if (res.data.jwt) {
  //         setToken(res.data.jwt);
  //       } else {
  //         logout();
  //         alert('签名失败');
  //         window.location.href = '/';
  //       }
  //     }
  //     return true;
  //   },
  //   component: () => import('@/views/home/index.vue'),
  // },
  {
    path: "/login",
    component: () => import("../views/template/index.vue"),
  },
];

export default routes;
