const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [ 
      {
        path: '/private/:key/:id/:code/:callestatus',
        component: () => import("pages/privatechat.vue")
      },
      {
        path: "/",
        component: () => import("pages/Main.vue")
      },
      {
        path: "/recorder",
        component: () => import("pages/recorder.vue")
      },
      {
        path: "/createbot",
        component: () => import("pages/desktop/botCreation.vue")
      },
      {
        path: "/main",
        component: () => import("pages/Main.vue")
      },
      {
        path: "/categories",
        component: () => import("pages/Main.vue"),
         props: route => ({ query: route.query.tag })
      },
      {
        path: "/newstream",
        component: () => import("pages/newstream.vue")
      },
      {
        path: "/become_a_model",
        component: () => import("pages/becomemodel.vue")
      },
      {
        path: "/chat",
        component: () => import("pages/chat.vue"),
        props: route => ({ query: route.query.box })
      },
      {
        path: "/profile",
        component: () => import("pages/profile.vue"),
        meta: { transitionName: 'slide' },
      },{
      path: "/user/:modelid",
      component: () => import("pages/profilev2.vue")
      },
      {
    path: "/profile/settings",
    component: () => import("pages/settings.vue")
  },
  {
    path: "/create",
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
