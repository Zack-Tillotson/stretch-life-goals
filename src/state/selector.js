import {createSelector} from 'reselect';

const base = (state) => {
  return state.firebaseData;
}

function transformObjectToArray(obj) {
  return Object.keys(obj).map(key => {
    return {
      ...obj[key],
      key
    }
  });
}

export const goals = createSelector(base, (state) => {
  return transformObjectToArray(state.goals || {});
});

export const ui = (state) => {
  return {
    ...state.ui,
    view: {
      goal: state.ui.viewName == 'goal',
      addGoal: state.ui.viewName == 'addGoal',
      goalList: state.ui.viewName == 'goalList'
    }
  };
}

const hasActive = (state) => !!state.ui.active;
const active = createSelector(hasActive, goals, ui,
  (hasActive, goals, ui) => {
    return hasActive ? goals.find(goal => goal.key == ui.active) : {}
  }
);

export const activeGoal = (state) => {
  return {hasActive: hasActive(state), active: active(state)};
}
