
import { testHttp ,uploadHttp ,picToStoreByIdHttp} from '@/api/home'

const home = {
  namespaced: true,
  state:{
    test:'home123',
    pageLoading:false
  },
  actions:{
    func1({ commit },params){
      return new Promise((resolve, reject) => {
        testHttp(params).then(res => {
          commit('FUNC1',res)
           resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    uploadAction({ commit },params){
      return new Promise((resolve, reject) => {
        uploadHttp(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    picToStoreByIdAction({ commit },params){
      return new Promise((resolve, reject) => {
        picToStoreByIdHttp(params).then(res => {
          resolve(res)
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