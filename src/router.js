import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
import moment from 'moment-timezone'

Vue.use(Router)
function isTokenExpired(){
  const data =  moment().unix();
  return localStorage.getItem('expiration_date') < data;
}

let router = new Router({

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresGuest: true
      }

    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.logged) {
      const data =  moment().unix()

      if(isTokenExpired()){
        store.dispatch("refresh_token").then(response => {
          next();
        }).catch(error => {
            next('/')
        })
      }else{

        if(!store.getters.token_refreshed){
          store.dispatch("setFreshToken", true)
        }
        next();
      }
      return
    }
    next('/')
  } else {
        if(to.matched.some(record => record.meta.requiresGuest)) {
            if (store.getters.logged) {
                next("/about");
                return;
            }
            next();
        }
        next()
    }

})

export default router
