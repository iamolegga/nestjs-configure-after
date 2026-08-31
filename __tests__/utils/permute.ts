export function permute<T>(input: T[]) {
  const ret: T[][] = [];

  for (const [i, item] of input.entries()) {
    const rest = permute(input.slice(0, i).concat(input.slice(i + 1)));

    if (!rest.length) {
      ret.push([item]);
    } else {
      for (const el of rest) {
        ret.push([item].concat(el));
      }
    }
  }
  return ret;
}
