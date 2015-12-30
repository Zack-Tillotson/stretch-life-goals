export default (state) => {
  const authProvider = state.firebase.authInfo && state.firebase.authInfo.provider || ''
  const uid = state.firebase.authInfo && state.firebase.authInfo.uid || ''
  return {
    ...state.firebase,
    authProvider,
    uid
  };
}