import Cookies from 'js-cookie'

const TokenKey = 'test-Token'
const UidKey = 'x-uid'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUid() {
  return Cookies.get(UidKey)
}
export function setUid(uid) {
  return Cookies.set(UidKey, uid)
}
export function removeUid() {
  return Cookies.remove(UidKey)
}
