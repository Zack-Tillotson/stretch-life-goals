const firebaseMeta = (state) => state.firebaseMeta;

export default (state) => {
  const authProvider = firebaseMeta(state).authInfo && firebaseMeta(state).authInfo.provider || '';
  const uid = firebaseMeta(state).authInfo && firebaseMeta(state).authInfo.uid || '';
  return {
    ...firebaseMeta(state),
    authProvider,
    uid
  };
}