const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/Main.vue")
      },
      {
        path: "/categories",
        component: () => import("pages/categories.vue")
      }, 
      {
        path: "/newstream",
        component: () => import("pages/desktop/newstream.vue")
      },
      {
        path: "/become_a_model",
        component: () => import("pages/desktop/become_a_model.vue")
      },
      {
        path: "/chat",
        component: () => import("pages/chat.vue")
      },
      {
        path: "/profile",
        component: () => import("pages/profile.vue")
      },
      {
        path: "/profile/settings",
        component: () => import("pages/settings.vue")
      },
      {
        path: "/notstream1",
        component: () => import("pages/notstream.vue")
      },
      {
        path: "/model_chat/:modelid",
        component: () => import("pages/model_chat.vue")
      },
      {
        path: "/model_chat/private/:modelid",
        component: () => import("pages/desktop/private.vue")
      },
      {
        path: "/streamer",
        component: () => import("pages/streamer.vue")
      },
      {
        path: "/test",
        component: () => import("pages/v.vue")
      },
      {
        path: "/live",
        component: () => import("pages/live.vue")
      },
      {
        path: "/videos",
        component: () => import("pages/mobile/index.vue")
      },
      {
        path: "/deposit",
        component: () => import("pages/deposit.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}
export default routes;
