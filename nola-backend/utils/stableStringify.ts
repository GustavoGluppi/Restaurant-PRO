export function stableStringify(obj: Record<string, any>): string {
  return JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce<Record<string, any>>((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  );
}
