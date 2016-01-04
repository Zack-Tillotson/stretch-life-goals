import {goals} from '../../state/selector';

export default state => {
  return {goals: goals(state)};
}