// Utils

export const toStringArray = (
  value: string | string[] | undefined,
): string[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
