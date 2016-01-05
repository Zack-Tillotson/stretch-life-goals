const firebaseMeta = (state) => state.firebaseMeta;

export default (state) => {
  const authProvider = firebaseMeta(state).authInfo && firebaseMeta(state).authInfo.provider || '';
  const uid = authProvider && firebaseMeta(state).authInfo.uid || '';
  const name = authProvider && authProvider != 'anonymous' && firebaseMeta(state).authInfo[authProvider].displayName || '';
  return {
    ...firebaseMeta(state),
    authProvider,
    uid,
    name
  };
}