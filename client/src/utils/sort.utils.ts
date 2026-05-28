export const sortByValue = (a: { value: string }, b: { value: string }) =>
  a.value.localeCompare(b.value);
