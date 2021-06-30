# base32check

![test](https://github.com/kirinus/base32check1/actions/workflows/library.yml/badge.svg?branch=main)
![publish](https://github.com/kirinus/base32check1/actions/workflows/publish.yml/badge.svg)
![npm](https://img.shields.io/npm/v/base32check1)

TypeScript implementation of the [Base32Check1](https://base32check.org/introduction.html#base32check1) algorithm.

There is already a [base32check](https://github.com/espadrine/base32check) JS library that follows
the original [primitive polynomial](https://mathworld.wolfram.com/PrimitivePolynomial.html) defined
by Thaddée Tyl. However, this implementation is a port from [base32check-python](https://github.com/bitmarck-service/base32check-python)
and [base32check-java](https://github.com/bitmarck-service/base32check-java)
developed by [BITMARCK Service GmbH](https://github.com/bitmarck-service) to support
[DiGA](https://www.bfarm.de/EN/MedicalDevices/DiGA/_node.html) submissions. Therefore, the checksums
computed by this library are different from the ones computed by [base32check](https://github.com/espadrine/base32check).

## Usage

Install:

```sh
#npm
npm install base32check
# yarn
yarn add base32check
```

Example:

```js
import { compute, validate } from 'base32check1';

compute('CONSECRATIO'); // returns 'X'
validate('CONSECRATIO'); // returns false

compute('CAFEDEAD'); // returns 'A'
validate('CAFEDEAD'); // returns true
```

### Codes

For Base34 codecs, take a look at the [base32-decode](https://github.com/LinusU/base32-decode)
and [base32-decode](https://github.com/LinusU/base32-encode) libraries.

Install:

```js
#npm
npm install base32-encode base32-decode
# yarn
yarn add base32-encode base32-decode
```

Usage:

```js
import * as base32Encode from 'base32-encode';
import * as base32Decode from 'base32-decode';

const data = new Uint8Array([0x74, 0x65, 0x73, 0x74]);

base32Encode(data, 'Crockford'); // returns 'EHJQ6X0'
base32Decode('EHJQ6X0', 'Crockford'); // returns ArrayBuffer { 4 }

base32Encode(data, 'RFC4648'); // returns 'ORSXG5A='
base32Decode('ORSXG5A=', 'RFC4648'); // returns ArrayBuffer { 4 }

base32Encode(data, 'RFC4648-HEX'); // returns 'EHIN6T0='
base32Decode('EHIN6T0=', 'FC4648-HEX'); // returns ArrayBuffer { 4 }
```

## Changelog

See the GitHub [release history](https://github.com/kirinus/base32check/releases).
