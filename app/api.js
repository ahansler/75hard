import { db, ref, set, get } from "./firebase.js";

const ROOT = "75hard";

export async function loadData() {
  const snapshot = await get(ref(db, ROOT));
  return snapshot.exists() ? snapshot.val() : null;
}

export async function saveData(data) {
  await set(ref(db, ROOT), data);
}