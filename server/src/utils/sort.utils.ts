import { ISortValue } from "../interfaces/filters.interface";

export const sortByValue = (a: ISortValue, b: ISortValue) =>
  a.value.localeCompare(b.value);
