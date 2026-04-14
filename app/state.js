export const state = {
  user: null,
  view: "tracker",
  profile: "him",
  data: {
    startDate: null,
    days: {}
  },
  loading: true,
  error: null
};

export function setState(updates) {
  Object.assign(state, updates);
}