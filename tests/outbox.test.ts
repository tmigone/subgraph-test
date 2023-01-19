import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, Bytes, ethereum, log, BigInt } from "@graphprotocol/graph-ts";

function strip0xPrefix(input: string): string {
  return input.startsWith("0x") ? input.slice(2) : input;
}
// Gets transactionIndex from the calldata
// This will error out if the call to executeTransaction is made from another contract, multicall, etc
function getTransactionIndex(calldata: string): BigInt | null {
  let strippedCallData = strip0xPrefix(calldata);
  // Validate selector
  // Method signature: executeTransaction(bytes32[],uint256,address,address,uint256,uint256,uint256,uint256,bytes)
  // MethodID: 0x08635a95
  let selector = strippedCallData.slice(0, 8);
  if (selector != "08635a95") {
    log.error("Invalid function selector", [selector]);
    return null;
  }

  // Decode ABI using a modified types mapping since the decode method fails with dynamic types
  // Original types mapping: (bytes32[],uint256,address,address,uint256,uint256,uint256,uint256,bytes)
  // Modified types mapping: (uint256,uint256,address,address,uint256,uint256,uint256,uint256)
  let types =
    "(uint256,uint256,address,address,uint256,uint256,uint256,uint256)";

  let callDataRaw = ethereum.decode(
    types,
    Bytes.fromHexString(strippedCallData.substring(8))
  );
  if (callDataRaw !== null) {
    return callDataRaw.toTuple()[1].toBigInt();
  } else {
    log.error("Could not decode call data!", []);
    return null;
  }
}

describe("Describe entity assertions", () => {
  test("test", () => {
    // let callDataString =
    //   "0xa9059cbb000000000000000000000000a1576a708fac73ba28e040521d7facaafde9e1f300000000000000000000000000000000000000000000000ba14d3ebbb2ef0000";
    // let types =
    //   "(address,uint256)";

    let callDataString =
      "0x08635a95000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000075e900000000000000000000000065e1a5e8946e7e87d9774f5288f41c30a99fd30200000000000000000000000001cdc91b0a9ba741903aa3699bf4ce31d6c5cc0600000000000000000000000000000000000000000000000000000000030f96ee0000000000000000000000000000000000000000000000000000000000f9848a0000000000000000000000000000000000000000000000000000000063b8ef1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000000f92ce734f7ef9cb92acf41827f02d6099b67c88ac0127174a70b009f7376ffd4fd9a315f8511d8e49f9d2216a9c6b0509dc777b0baf81bd79f6010f1cf5f622a4a82f64143321d7af81e2ab0eaaa1067a5f212e0e33f8ec6e3b6ea2f667b5e18a6a1a5a4d367a111dc408571eb630a09375e93c076e2ef73ce86d11b185354e9bd1f0f23e3418f96787f90b54cdcfc00301eb7e33bee9873b14828933e1386704a70267a8847155b65891e966d8980f103bfe1a7751b29c4f4d0c9e60db2eaea1f40618b9f5dc656da6a22f4c19fa65534f23bd12489636b0cd5f4fcd22aa9fdf53fed07230ab79ea443c88723ccbabf9835dc87a45c07dc4bd4f9a704f45f7394b09da5f31343ab317a856c791273ee69fd5bd6510475bf7a52e89df8573bd0d9e82b17ecd1b86fc68a75d93f151e6c530cd60a321f69ddcb9d3c4821e6a91dfc5b35e5ffb66ce5af7e1b510fdc51f3377aee36efb50397c954a9b6802e1a69500000000000000000000000000000000000000000000000000000000000000003fde134bbd3ead2e5a0974de9102751e55931acfca5b6f8fcdfea75c43956e08b2a0d12c3d3821d825be762f04222d75c4af885b55fc3238730b27e936598b32b3f80cf2d6f3aee428a4b7307fdd329781c16fd4342d2d648a73bf3dbfb8ce7a00000000000000000000000000000000000000000000000000000000000001242e567b36000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a70000000000000000000000002aed0cbd2bf39784d2a840d582fcd5672724fe7e0000000000000000000000002aed0cbd2bf39784d2a840d582fcd5672724fe7e00000000000000000000000000000000000000000000011207f946e43e94840000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    let transactionIndex = getTransactionIndex(callDataString);
    if (transactionIndex !== null) {
      log.warning("transactionIndex: {}", [transactionIndex.toString()]);
    }

    // EXAMPLE
    // let bytesArray = [
    //   Bytes.fromHexString("0x1234"),
    //   Bytes.fromHexString("0x1234"),
    //   Bytes.fromHexString("0x1234"),
    //   Bytes.fromHexString("0x1234"),
    // ];

    // let tupleArray: Array<ethereum.Value> = [
    //   // ethereum.Value.fromBytesArray(bytesArray),
    //   ethereum.Value.fromAddress(
    //     Address.fromString("0x0000000000000000000000000000000000000420")
    //   ),
    //   ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(62)),
    // ];
    // let tuple = tupleArray as ethereum.Tuple;
    // let encoded = ethereum.encode(ethereum.Value.fromBytesArray(bytesArray))!;

    // let decoded = ethereum.decode("(address,uint256)", encoded);
    // if (decoded !== null) {
    //   let data = decoded.toTuple();
    //   // log.warning("First field: {}", [callData[0].toAddress().toHexString()]);
    //   log.warning("Second field: {}", [data[1].toBigInt().toHexString()]);
    //   log.warning("Third field: {}", [data[2].toAddress().toHexString()]);
    // } else {
    //   log.warning("Could not decode call data", []);
    // }
  });
});
