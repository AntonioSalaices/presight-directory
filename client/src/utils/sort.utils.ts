import { ISortValue } from "../interfaces/utils.interface";

export const sortByValue = (a: ISortValue, b: ISortValue) =>
  a.value.localeCompare(b.value);
