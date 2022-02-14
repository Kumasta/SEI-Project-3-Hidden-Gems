import { Buffer } from 'buffer'

export const getLocalToken = () => {
  return window.localStorage.getItem('hidden-gems-token')
}

export const getPayload = () => {
  const token = getLocalToken()
  if(!token) return 
  const splitToken = token.split('.')
  console.log('split token', splitToken)
  if (splitToken.length !== 3) return 
  const splitTokenOne = splitToken[1]
  console.log('splitTokenOne', splitTokenOne)
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return 
    const currentTime = Math.round(Date.now() / 1000 )
    return currentTime < payload.exp
  }