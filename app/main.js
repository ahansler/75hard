import { state, setState } from "./state.js";
import { VIEWS } from "./config.js";
import { loadData } from "./api.js";

import { renderTracker } from "./render/tracker.js";
import { renderMeals } from "./render/meals.js";
import { renderRecipes } from "./render/recipes.js";

const app = document.getElementById("app");

function render() {
  if (state.loading) {
    app.innerHTML = "Loading...";
    return;
  }

  if (state.error) {
    app.innerHTML = `
      <div>
        Error: ${state.error}
        <button onclick="location.reload()">Retry</button>
      </div>
    `;
    return;
  }

  switch (state.view) {
    case VIEWS.TRACKER:
      renderTracker(app, render);
      break;
    case VIEWS.MEALS:
      renderMeals(app);
      break;
    case VIEWS.RECIPES:
      renderRecipes(app);
      break;
  }
}

export async function init() {
  try {
    const data = await loadData();

    setState({
      data: data || { startDate: null, days: {} },
      loading: false
    });
  } catch (e) {
    setState({
      error: e.message,
      loading: false
    });
  }

  render();
}

// Navigation (replaces inline handlers)
window.navigate = (view) => {
  setState({ view });
  render();
};