export const challenges = (state) => state.challenges;

const activeChallenge = (state) => state.challenges[state.ui.active];

function transformChallenge(challenge = {}) {
  return {
    ...challenge,
    goals: objectToArray(challenge.goals)
  };
}

function objectToArray(object = {}) {
  return Object.keys(object).map(key => object[key]);
}

export const challenge = (state) => {
  const hasSelection = !!state.ui.active;
  const challenge = transformChallenge(state.challenges.find(challenge => challenge.key == state.ui.active));
  return {hasSelection, challenge};
}