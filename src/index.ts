const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const CARDINAL = 1 << 5;

const alphabetList = [...ALPHABET];
const numberList = [...Array.from({ length: alphabetList.length }).keys()];
const alphabetIndex: Record<string, number> = {};
for (const [index, char] of alphabetList.entries()) {
  alphabetIndex[char] = numberList[index];
}

function getPrimitivePowers(primitive: number[]): number[][] {
  const result: number[][] = [[], primitive];
  for (const index of Array.from<number>({ length: CARDINAL })
    .slice(2)
    .keys()) {
    const values = multiplyArrays(result[index + 1], primitive);
    if (index + 2 < CARDINAL - 1) {
      result.push(values);
    } else {
      result[0] = values;
    }
  }
  return result;
}

function multiplyArrays(arrayA: number[], arrayB: number[]): number[] {
  const result = Array.from<number>({ length: arrayA.length });
  for (const [aIndex, aValue] of arrayA.entries()) {
    result[aIndex] = 0;
    for (const [bIndex, bValue] of arrayB.entries()) {
      if ((aValue && 1 << (arrayB.length - 1 - bIndex)) != 0) {
        result[aIndex] ^= bValue;
      }
    }
  }
  return result;
}

export function compute(payload: string): string {
  const primitivePowers = getPrimitivePowers([0x01, 0x11, 0x08, 0x05, 0x03]);
  let sum = 0;
  for (const index of Array.from<number>({ length: payload.length }).keys()) {
    sum ^= multiplyArrays(
      [alphabetIndex[index]],
      primitivePowers[(index + 1) % (CARDINAL - 1)],
    )[0];
  }
  let exp = (CARDINAL - payload.length - 2) % (CARDINAL - 1);
  if (exp < 0) {
    exp += CARDINAL - 1;
  }
  return ALPHABET.charAt(multiplyArrays([sum], primitivePowers[exp])[0]);
}

export function validate(payload: string): boolean {
  return compute(payload) === 'A';
}
