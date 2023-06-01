export const numbers: number[] = [];

const getNumb0to9 = (): void => {
  for (let i = 1; i < 10; i++) {
    numbers.push(i);
  }
};

getNumb0to9();
