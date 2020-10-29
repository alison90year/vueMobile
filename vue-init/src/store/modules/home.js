
import { testHttp } from '@/api/home'

const home = {
  namespaced: true,
  state:{
    test:'home123',
    pageLoading:false
  },
  actions:{
    func1({ commit },params){
      return new Promise((resolve, reject) => {
        testHttp('/posts',params).then(res => {
          commit('FUNC1',res.data.slice(0,2))
           resolve(res.data.slice(0,2))
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations:{
    FUNC1(state,data){
      state.test = data
    }
  }
}

export default home