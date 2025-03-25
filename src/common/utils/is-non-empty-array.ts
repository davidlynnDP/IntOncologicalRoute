

export const isNonEmptyArray = (value: unknown): boolean => {

  return Array.isArray(value) && value.length > 0;
}
