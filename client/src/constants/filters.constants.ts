import { ESortBy } from "../enums/filters.enum";

export const SORT_FIELDS = [
  { label: "First Name", value: ESortBy.FIRST_NAME },
  { label: "Last Name", value: ESortBy.LAST_NAME },
  { label: "Age", value: ESortBy.AGE },
  { label: "Nationality", value: ESortBy.NATIONALITY },
];

export const DEBOUNCE_MS = 300;
