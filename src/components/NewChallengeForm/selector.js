import firebaseSelector from '../../firebase/selector';

export default state => {
  return {challenges: state.challenges, firebase: firebaseSelector(state)};
}