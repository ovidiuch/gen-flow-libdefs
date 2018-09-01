// @flow

declare export function updateItem<T>(
  items: $ReadOnlyArray<T>,
  item: T,
  update: $Shape<T>
): Array<T>;
