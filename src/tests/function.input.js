// @flow

export function updateItem<T>(
  items: $ReadOnlyArray<T>,
  item: T,
  update: $Shape<T>
): Array<T> {
  const index = items.indexOf(item);

  return [
    ...items.slice(0, index),
    { ...item, ...update },
    ...items.slice(index + 1)
  ];
}
