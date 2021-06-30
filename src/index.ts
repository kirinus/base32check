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
    const values = matMul(result[index + 1], primitive);
    if (index + 2 < CARDINAL - 1) {
      result.push(values);
    } else {
      result[0] = values;
    }
  }
  return result;
}

function matMul(arrayA: number[], arrayB: number[]): number[] {
  const result: number[] = [];
  for (const aIndex of Array.from<number>({ length: arrayA.length }).keys()) {
    result.push(0);
    for (const bIndex of Array.from<number>({
      length: arrayB.length,
    }).keys()) {
      if ((arrayA[aIndex] & (1 << (arrayB.length - 1 - bIndex))) != 0) {
        result[aIndex] ^= arrayB[bIndex];
      }
    }
  }
  return result;
}

/**
 * Calculates checksum from the given payload
 * @param payload
 * @returns Calculated checksum character
 */
export function compute(payload: string): string {
  const primitivePowers = getPrimitivePowers([0x01, 0x11, 0x08, 0x05, 0x03]);
  let sum = 0;
  for (const index of Array.from<number>({ length: payload.length }).keys()) {
    sum ^= matMul(
      [alphabetIndex[payload.charAt(index)]],
      primitivePowers[(index + 1) % (CARDINAL - 1)],
    )[0];
  }
  let exp = (CARDINAL - payload.length - 2) % (CARDINAL - 1);
  if (exp < 0) {
    exp += CARDINAL - 1;
  }
  return ALPHABET.charAt(matMul([sum], primitivePowers[exp])[0]);
}

/**
 * Checks if given payload has a valid checksum
 * @param payload
 * @returns Success if payload is base32check1
 */
export function validate(payload: string): boolean {
  return compute(payload) === 'A';
}
