import { ByteArray, Bytes } from "@graphprotocol/graph-ts";

export function numberToBytes(num: u64): ByteArray {
  return stripZeros(Bytes.fromU64(num).reverse());
}

export function stripZeros(bytes: Uint8Array): ByteArray {
  let i = 0;
  while (i < bytes.length && bytes[i] == 0) {
    i++;
  }
  return Bytes.fromUint8Array(bytes.slice(i));
}

export function strip0xPrefix(input: string): string {
  return input.startsWith("0x") ? input.slice(2) : input;
}