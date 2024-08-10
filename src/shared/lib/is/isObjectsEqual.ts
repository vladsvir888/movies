export const isObjectsEqual = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
