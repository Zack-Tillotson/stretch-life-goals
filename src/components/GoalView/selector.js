import firebase from '../../firebase/selector';
import {activeGoal} from '../../state/selector';

export default state => {
  return {...activeGoal(state), firebase: firebase(state)};
}