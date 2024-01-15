
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token,user) {
  if(user){
  return Cookies.set(user, token)

  }else{
  return Cookies.set(TokenKey, token)

  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
