export const count = (q: number): any => {
  let amount = Number(q);
  return {
    '+': () => (amount += 1),
    '-': () => (amount -= 1),
  };
};
