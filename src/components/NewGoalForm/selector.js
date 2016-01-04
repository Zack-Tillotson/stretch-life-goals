import firebaseSelector from '../../firebase/selector';

export default state => {
  return {firebase: firebaseSelector(state)};
}