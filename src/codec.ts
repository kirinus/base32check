import base32Decode from 'base32-decode';
import base32Encode from 'base32-encode';

export enum Base32Variant {
  Rfc3548 = 'RFC3548', // Alias of Rfc4648
  Rfc4648 = 'RFC4648',
  Rfc4648Hex = 'RFC4648-HEX',
  Crockford = 'Crockford',
}

export interface Base32DecodeOptions {
  variant?: Base32Variant;
}

export interface Base32EncodeOptions extends Base32DecodeOptions {
  padding?: boolean;
}

/**
 * Decodes a base32 string
 * @param payload Input string
 * @param options Base32 codec variant ('Crockford' by default)
 * @returns The decoded raw data
 */
export function decode(
  payload: string,
  { variant = Base32Variant.Crockford }: Base32DecodeOptions = {},
): ArrayBuffer {
  return base32Decode(payload, variant);
}

/**
 * Encodes a base32 string
 * @param payload Input string
 * @param options Base32 codec variant ('Crockford' by default) and padding
 * @returns The encoded Base32 string
 */
export function encode(
  payload: ArrayBuffer | Uint8Array | Int8Array | Uint8ClampedArray,
  { padding, variant = Base32Variant.Crockford }: Base32EncodeOptions = {},
): string {
  return base32Encode(payload, variant, { padding });
}
