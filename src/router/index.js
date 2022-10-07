import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MainPage from "../views/MainPage.vue";
import { getAuth } from "firebase/auth";

// const requireAuth = (to,from,next) => {
//   let user = getAuth().currentUser
//   console.log("current user in auth guard: ", user)
//   if (!user && to.name != "MainPage") next({ name: "MainPage" });
//   else next();
// }

// router.beforeEach(async (to,from,next) => {
//   //make sure user is not null
//   if(!user && to.name != 'Home') next({name:'Home'})
//   else next()
// })

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mainPage",
    name: "MainPage",
    component: MainPage,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
