import {
  ALLOWED_SORT_DIRS,
  ALLOWED_SORT_FIELDS,
} from "../utils/query-validators";

export interface IFilterOption {
  value: string;
  count: number;
}

export type ISortField = (typeof ALLOWED_SORT_FIELDS)[number];
export type ISortDir = (typeof ALLOWED_SORT_DIRS)[number];
export interface ISortValue {
  value: string;
}
