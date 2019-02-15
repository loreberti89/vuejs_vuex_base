const state = {
  loading: false
}

const mutations = {
  SET_LOADING_STATE (state, _loading) {
    state.loading = _loading;
  }

}


const actions = {
  showLoading ({ commit }) {
    commit("SET_LOADING_STATE", true)

  },
  hideLoading ({ commit }) {
    commit("SET_LOADING_STATE", false)

  }
}

const getters = {

   loading: state => state.loading
 }

export default {
  state,
  getters,
  mutations,
  actions
}
