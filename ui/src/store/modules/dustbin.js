import Vue from 'vue'
import router from '../../router/index'
import config from '../../../config/config'

export default {
  namespaced: true,
  state: {
    dustbins: null
  },
  actions: {
    getDustbins({commit}) {
      const token = localStorage.getItem('token')
      Vue.http.post(`${config.BASE_URL}/get-dustbins`, {headers: {'Authorization': `Bearer ${token}`}}).then(response => {
        commit('setDustbins', response.body);
        console.log(response)
      }).catch(response => {
        if (response.status === 401) {
          console.log('Unauthorised', response.body.message)
          router.push('/login')
        }else if (response.status === 403){
          console.log('You do not have access to read this data')
        }
      })
    },
  },
  mutations: {
    setDustbins(state, payload) {
      state.dustbins = payload;
    }
  }
};
