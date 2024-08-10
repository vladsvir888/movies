export const getTitleOrName = (data: Record<string, unknown>): string => {
  const { title, name } = data;

  return (title ? title : name) as unknown as string;
};
