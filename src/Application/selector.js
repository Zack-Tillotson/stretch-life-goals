import firebaseSelector from '../firebase/selector';
import {ui as uiSelector} from '../state/selector';

export default (state) => {
  const firebase = firebaseSelector(state);
  const ui = uiSelector(state);
  return {firebase, ui};
}