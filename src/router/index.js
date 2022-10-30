import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CountryPage from "../views/CountryPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
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
    path: "/Country/:name",
    name: "Country",
    component: CountryPage,
    props: route => ({details: route.query.details}),
    // beforeEnter: requireAuth,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
