// export const getLocalToken = () => {
//   return window.localStorage.getItem('hidden-gems-token')
// }

// export const getPayload = () => {
//   const token = getLocalToken()
//   if(!token) return 
//   const splitToken = token.split('.')
//   console.log('splitToken', splitToken)
//   if (splitToken.length !== 3) return 
//   return JSON.parse(Buffer.from(splitToken[1], 'base64'))
// }

// export const userIsAuthorised = () => {
//     const payload = getPayload()
//     if (!payload) return 
//     const currentTime = Math.round(Date.now() / 1000 )
//     return currentTime < payload.exp
//   }