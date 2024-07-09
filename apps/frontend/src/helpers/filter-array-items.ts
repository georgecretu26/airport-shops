type SearchableFields<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

const filterItems = <T>(
  item: T,
  fields: SearchableFields<T>[],
  query: string
): boolean => {
  const lowerCaseQuery = query.toLowerCase();
  return fields.some((field) =>
    (item[field] as unknown as string).toLowerCase().includes(lowerCaseQuery)
  );
};

export default filterItems;
