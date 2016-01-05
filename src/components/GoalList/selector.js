import {goals} from '../../state/selector';
import firebase from '../../firebase/selector';

export default state => {
  return {goals: goals(state), firebase: firebase(state)};
}