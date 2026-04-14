import { state } from "../state.js";
import { today } from "../utils/date.js";
import { saveData } from "../api.js";

export function renderTracker(container, rerender) {
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Tracker";
  container.appendChild(title);

  const t = today();
  const day = state.data.days[t] || {};

  const list = document.createElement("div");

  Object.keys(day).forEach((task) => {
    const btn = document.createElement("button");
    btn.textContent = `${task}: ${day[task] ? "✅" : "⬜"}`;

    btn.onclick = async () => {
      const updated = {
        ...state.data,
        days: {
          ...state.data.days,
          [t]: {
            ...day,
            [task]: !day[task]
          }
        }
      };

      state.data = updated;
      await saveData(updated);
      rerender();
    };

    list.appendChild(btn);
  });

  container.appendChild(list);
}