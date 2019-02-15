import Vue from 'vue';
import moment from 'moment-timezone'

const state = {
  logged: false,
  token_refreshed: false,
}

const mutations = {
  SET_LOGGED_STATE (state, logged) {
    state.logged = logged;
  },
  SET_FRESH_TOKEN (state, value){
    state.token_refreshed = value;
  }

}


const actions = {
  login ({ commit }, credentials) {

    return Vue.http.post(Vue.env.API_URL+'/authenticate', {username: credentials.username, password: credentials.password})
    .then(response => {


      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      const date =  moment().unix()

      localStorage.setItem('expiration_date', (date + parseInt(response.data.expires_in) ))

      Vue.http.defaults.headers.common['Authorization'] = "Bearer "+response.data.access_token;
      commit('SET_LOGGED_STATE', true)
      commit('SET_FRESH_TOKEN', true)

    })
    .catch(error => {
      // set `state.loading` to false and do something with error

      commit('SET_LOGGED_STATE', false)

    })

  },
  logout({commit}){

    return new Promise((resolve, reject) => {

      return Vue.http.post(Vue.env.API_URL+'/logout')
      .then(response => {
        commit('SET_LOGGED_STATE', false)
        commit('SET_FRESH_TOKEN', false)
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('expiration_date')
        delete Vue.http.defaults.headers.common['Authorization']
        resolve();
      })
      .catch(error => {
        // set `state.loading` to false and do something with error
        reject();
      });

      resolve()
    })
  },
  refresh_token({commit}){
      return new Promise((resolve, reject) => {
        return Vue.http.post(Vue.env.API_URL+'/refreshToken', {refresh_token: localStorage.getItem('refresh_token')})
        .then(response => {
          console.log("refreshed");

          localStorage.setItem('token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          const date =  moment().unix()
          localStorage.setItem('expiration_date', (date + parseInt(response.data.expires_in) ))
          Vue.http.defaults.headers.common['Authorization'] = "Bearer "+response.data.access_token;
          commit('SET_LOGGED_STATE', true)
          commit('SET_FRESH_TOKEN', true)
          resolve()


        })
        .catch(error => {
          // set `state.loading` to false and do something with error

          commit('SET_LOGGED_STATE', false)
          commit('SET_FRESH_TOKEN', false)
          console.log("not_refresh");
            reject()

        })
      });

  },
  //to delete
  setLogged({commit}){
    commit('SET_LOGGED_STATE', true)
  },
  setFreshToken({commit}, value){
    commit('SET_FRESH_TOKEN', value)
  }
}

const getters = {

   logged: state => state.logged,
   token_refreshed: state => state.token_refreshed
 }

export default {
  state,
  getters,
  mutations,
  actions
}
