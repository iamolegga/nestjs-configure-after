export function permute<T>(input: T[]) {
  const ret: T[][] = [];

  for (let i = 0; i < input.length; i = i + 1) {
    const rest = permute(input.slice(0, i).concat(input.slice(i + 1)));

    if (!rest.length) {
      ret.push([input[i]!]);
    } else {
      for (const el of rest) {
        ret.push(<T[]>[input[i]].concat(el));
      }
    }
  }
  return ret;
}
