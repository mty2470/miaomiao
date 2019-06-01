import Vue from 'vue'
import Router from 'vue-router'
import movierouter from './movierouter'
import minerouter from './minerouter'
import cinemarouter from './cinemarouter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base:
  routes: [
    movierouter,
    minerouter,
    cinemarouter,
    {
      path:"/*",
      redirect:"/movie"
    }
  ]
})
