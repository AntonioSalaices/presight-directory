import { ESortDir, EUserFields } from "../enums/filters.enum";
import { ISortDir, ISortField } from "../interfaces/filters.interface";

export const ALLOWED_SORT_FIELDS = [
  EUserFields.FIRST_NAME,
  EUserFields.LAST_NAME,
  EUserFields.AGE,
  EUserFields.NATIONALITY,
] as const;
export const ALLOWED_SORT_DIRS = [ESortDir.ASC, ESortDir.DESC] as const;

const SORT_FIELD_COLUMNS: Record<ISortField, string> = {
  [EUserFields.FIRST_NAME]: "first_name",
  [EUserFields.LAST_NAME]: "last_name",
  [EUserFields.AGE]: "age",
  [EUserFields.NATIONALITY]: "nationality",
};

export const toSortColumn = (field: ISortField): string =>
  SORT_FIELD_COLUMNS[field];

const isValidSortField = (value: string): value is ISortField => {
  return ALLOWED_SORT_FIELDS.includes(value as ISortField);
};

const isValidSortDir = (value: string): value is ISortDir => {
  return ALLOWED_SORT_DIRS.includes(value as ISortDir);
};

export const sanitizeSortField = (value: string | undefined): ISortField => {
  return value && isValidSortField(value) ? value : EUserFields.FIRST_NAME;
};

export const sanitizeSortDir = (value: string | undefined): ISortDir => {
  return value && isValidSortDir(value) ? value : ESortDir.ASC;
};
