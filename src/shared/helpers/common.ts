
export function randomFromRange(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from;
}

export function getRandomArrayElement<T>(arr: T[]): T {
  return arr[randomFromRange(0, arr.length)];
}

export function createUniqueRandomSequence(from: number, to: number): () => number {
  const sequence = new Set<number>();
  return () => {
    let res = randomFromRange(from, to);
    while (sequence.has(res)) {
      res = randomFromRange(from, to);
    }
    return res;
  };
}

export function getRandomArrayItems<T>(arr: T[]): T[] {
  const sequenceLimit = randomFromRange(0, arr.length);
  const sequence = createUniqueRandomSequence(0, sequenceLimit);

  const result = [];
  let randomArrayIndex = 0;
  let count = 0;
  do {
    count += 1;
    randomArrayIndex = sequence();
    result.push(arr[randomArrayIndex]);
  } while (count < sequenceLimit);

  return result;
}

export function createUniqueIdSequence(from: number, to: number): () => string {
  const sequence = createUniqueRandomSequence(from, to);
  return () => {
    const newId = sequence();
    return String(newId).padStart(8, '0');
  };
}
