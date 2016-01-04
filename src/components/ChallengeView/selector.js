import {challenge} from '../../state/selector';

export default state => {
  return {challenge: challenge(state)};
}