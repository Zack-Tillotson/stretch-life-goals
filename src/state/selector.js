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
  const array = transformObjectToArray(state.goals || {});
  return array.map(goal => {
    const progress = transformObjectToArray(goal.progress || {});
    const amtDone = progress.length;
    const nextMilestone = goal.milestones.find(milestone => milestone > amtDone) 
      || goal.milestones[goal.milestones.length];
    const percDone = parseInt(amtDone / nextMilestone * 100);
    return {...goal, amtDone, nextMilestone, percDone};
  });
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
