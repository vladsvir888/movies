export default (choice) => {
  const name = new Intl.PluralRules("ru").select(choice);

  return { one: 0, few: 1, many: 2, other: 3 }[name];
};
