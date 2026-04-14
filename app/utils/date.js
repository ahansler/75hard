export function fmt(d) {
  return new Date(d).toISOString().split("T")[0];
}

export function today() {
  return fmt(new Date());
}