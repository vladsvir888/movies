export const russianPlurals = (choice: number): number => {
  type ExtractedMembers = Extract<typeof name, keyof typeof category>;

  const name = new Intl.PluralRules("ru").select(choice);
  const category = { one: 0, few: 1, many: 2, other: 3 };

  return category[name as ExtractedMembers];
};
