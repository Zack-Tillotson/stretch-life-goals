import firebaseSelector from '../../firebase/selector';
import {challenge as challengeSelector} from '../../state/selector';

export default state => {
  return {selected: challengeSelector(state), firebase: firebaseSelector(state)};
}