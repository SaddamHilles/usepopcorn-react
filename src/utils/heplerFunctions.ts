export const average = (arr: number[]) =>
  arr !== undefined && arr?.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);