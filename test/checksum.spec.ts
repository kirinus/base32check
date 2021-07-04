import { compute, validate } from '../src/checksum';

describe('base34check1 checksum', () => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const payloadToCheck1 = {
    '': 'A',
    A: 'A',
    AB: 'Q',
    ABC: 'J',
    ABCD: 'V',
    ABCDE: 'I',
    ABCDEF: 'G',
    ABCDEFG: 'A',
    ABCDEFGH: 'T',
    ABCDEFGHI: '5',
    ABCDEFGHIJ: 'K',
    ABCDEFGHIJK: 'A',
    ABCDEFGHIJKL: 'F',
    ABCDEFGHIJKLM: 'U',
    ABCDEFGHIJKLMN: 'M',
    ABCDEFGHIJKLMNO: 'R',
    ABCDEFGHIJKLMNOP: '7',
    ABCDEFGHIJKLMNOPQ: 'X',
    ABCDEFGHIJKLMNOPQR: 'D',
    ABCDEFGHIJKLMNOPQRS: 'I',
    ABCDEFGHIJKLMNOPQRST: '5',
    ABCDEFGHIJKLMNOPQRSTU: 'U',
    ABCDEFGHIJKLMNOPQRSTUV: 'Q',
    ABCDEFGHIJKLMNOPQRSTUVW: 'D',
    ABCDEFGHIJKLMNOPQRSTUVWX: 'K',
    ABCDEFGHIJKLMNOPQRSTUVWXY: 'J',
    ABCDEFGHIJKLMNOPQRSTUVWXYZ: 'Y',
    ABCDEFGHIJKLMNOPQRSTUVWXYZ2: 'R',
    ABCDEFGHIJKLMNOPQRSTUVWXYZ23: 'V',
    ABCDEFGHIJKLMNOPQRSTUVWXYZ234: 'U',
    ABCDEFGHIJKLMNOPQRSTUVWXYZ2345: 'U',
    // 31 chars % 31 == 0 chars - see https://github.com/espadrine/base32check/pull/2 :
    ABCDEFGHIJKLMNOPQRSTUVWXYZ23456: 'V',
    ABCDEFGHIJKLMNOPQRSTUVWXYZ234567: 'V',
    // 62 chars % 31 == 0 chars - see https://github.com/espadrine/base32check/pull/2 :
    ABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVWXYZ2345: '6',
    // 93 chars % 31 == 0 chars - see https://github.com/espadrine/base32check/pull/2 :
    // eslint-disable-next-line max-len
    ABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVWXYZ234:
      'K', // 93 chars
    CONSECRATIO: 'X',
    CAFEBABE: 'N',
    CAFEDEAD: 'A',
    DEADBEEF: 'L',
    '234567': 'Z',
  };
  /* eslint-enable @typescript-eslint/naming-convention */

  Object.entries(payloadToCheck1).forEach(([payload, check1]) =>
    it(`Should compute ${payload} to ${check1}`, () => {
      expect(compute(payload)).toBe(check1);
    }),
  );

  Object.entries(payloadToCheck1)
    .slice(0, 1)
    .forEach(([payload, check1]) =>
      it(`Should validate ${payload} + ${check1}`, () => {
        expect(validate(payload + check1)).toBe(true);
      }),
    );

  Object.entries(payloadToCheck1)
    .filter(([_, check1]) => check1 != 'A')
    .forEach(([payload]) =>
      it(`Should reject ${payload}`, () => {
        expect(validate(payload)).toBe(false);
      }),
    );
});
