import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import {
  Address,
  Bytes,
  ethereum,
  crypto,
  log,
  BigInt,
  ByteArray,
} from "@graphprotocol/graph-ts";
import { calculateSubmitRetryableId } from "../src/helpers/bridge";
import { bigIntToBytes, strip0xPrefix, stripZeros } from "../src/helpers/byte";
import { parseMessageDeliveredData } from "../src/helpers/events/MessageDelivered";
import { getTxToL2Data, parseTxToL2Data } from "../src/helpers/events/TxToL2";

describe("Describe entity assertions", () => {
  test("test", () => {
    // log.info(
    //   `0 integer is ${RLPEncode(
    //     Bytes.fromUint8Array(stripLeadingZeroes(Bytes.fromU64(0).reverse()))
    //   )}`,
    //   []
    // );
    // log.info(`0x00 is ${RLPEncode(Bytes.fromHexString("0x00"))}`, []);
    // log.info(`0x0f is ${RLPEncode(Bytes.fromHexString("0x0f"))}`, []);
    // log.info(`0x0400 is ${RLPEncode(Bytes.fromHexString("0x0400"))}`, []);
    // log.info(
    //   `dog is ${RLPEncode(
    //     Bytes.fromUTF8(
    //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    //     )
    //   )}`,
    //   []
    // );
    // log.info(
    //   `dog is ${RLPEncodeArray([
    //     Bytes.fromUTF8("cat"),
    //     Bytes.fromUTF8("dog"),
    //   ])}`,
    //   []
    // );
    // log.info(`dog is ${RLPEncode(Bytes.fromUTF8(""))}`, []);
    // let input2: ByteArray[] = [
    //   Bytes.fromHexString("0x066EED"),
    //   Bytes.fromHexString(
    //     "0x0000000000000000000000000000000000000000000000000000000000007A12"
    //   ),
    //   Bytes.fromHexString("0xd940f7b51C3e593D709BA3de1B3a0d233d1DFDb2"),
    //   Bytes.fromHexString("0x020ECA945D"),
    //   Bytes.fromHexString("0x7894bf4ae940"),
    //   Bytes.fromHexString("0x11e1a300"),
    //   Bytes.fromHexString("0x01b22d"),
    //   Bytes.fromHexString("0xef2757855d2802bA53733901F90C91645973f743"),
    //   Bytes.fromHexString("0x"),
    //   Bytes.fromHexString("0xEfc519BEd6a43a14f1BBBbA9e796C4931f7A5540"),
    //   Bytes.fromHexString("0x5a41144b4240"),
    //   Bytes.fromHexString("0xEfc519BEd6a43a14f1BBBbA9e796C4931f7A5540"),
    //   Bytes.fromHexString(
    //     "0x2e567b360000000000000000000000005c946740441c12510a167b447b7de565c20b9e3c000000000000000000000000efc519bed6a43a14f1bbbba9e796c4931f7a5540000000000000000000000000efc519bed6a43a14f1bbbba9e796c4931f7a5540000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000"
    //   ),
    // ];
    // log.info(`retryableTicketId is ${calculateSubmitRetryableId(input2)}`, []);

    // {
    //   "data": {
    //     "bridgeDepositTransactions": [
    //       {
    //         "id": "0x31a55311515e7e3ee92b7817b565c44962e23522d2ac1831f301aa84f1940e1fef010000",
    //         "blockNumber": 16430683,
    //         "timestamp": 1674008675,
    //         "signer": "0xba321653bdb2525c866d962ad66be358f6718d78",
    //         "txHash": "0x31a55311515e7e3ee92b7817b565c44962e23522d2ac1831f301aa84f1940e1f",
    //         "retryableTicketId": "0x32e9900af0004947ff15203ef0b68e6a1914ada2cfcbd9cfd2a980f3972dcbbe",
    //         "l2ChainId": "0xa4b1",
    //         "fromAddress": "0x12dec91b0a9ba741903aa3699bf4ce31d6c5dd17",
    //         "messageNumber": "0x0000000000000000000000000000000000000000000000000000000000063340",
    //         "l1BaseFee": "0x038f1e3ea0",
    //         "destAddress": "0x65e1a5e8946e7e87d9774f5288f41c30a99fd302",
    //         "l2CallValue": "0x00",
    //         "l1Value": "0x024d042ad54e80",
    //         "maxSubmissionFee": "0x00d5fff1a13880",
    //         "excessFeeRefundAddress": "0xcb431653bdb2525c866d962ad66be358f6719e89",
    //         "callValueRefundAddress": "0xcb431653bdb2525c866d962ad66be358f6719e89",
    //         "gasLimit": "0x01ad84",
    //         "maxFeePerGas": "0x00df847580",
    //         "data": "0x2e567b36000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a7000000000000000000000000ba321653bdb2525c866d962ad66be358f6718d780000000000000000000000001b07d3344188908fb6deceac381f3ee63c48477a000000000000000000000000000000000000000000000033b768d97dcaa8000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d36269bef500003f8f21191b3f7c5982dc87f80300000000000000000000000000000000000000000000000000000000"
    //       }
    //     ]
    //   }
    // }

    let input3: ByteArray[] = [
      Bytes.fromHexString("0xa4b1"),
      Bytes.fromHexString(
        "0x0000000000000000000000000000000000000000000000000000000000063340"
      ),
      Bytes.fromHexString("0x12dec91b0a9ba741903aa3699bf4ce31d6c5dd17"),
      Bytes.fromHexString("0x038f1e3ea0"),
      Bytes.fromHexString("0x024d042ad54e80"),
      Bytes.fromHexString("0xdf847580"),
      Bytes.fromHexString("0x01ad84"),
      Bytes.fromHexString("0x65e1a5e8946e7e87d9774f5288f41c30a99fd302"),
      Bytes.fromHexString("0x"),
      Bytes.fromHexString("0xcb431653bdb2525c866d962ad66be358f6719e89"),
      Bytes.fromHexString("0xd5fff1a13880"),
      Bytes.fromHexString("0xcb431653bdb2525c866d962ad66be358f6719e89"),
      Bytes.fromHexString(
        "0x2e567b36000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a7000000000000000000000000ba321653bdb2525c866d962ad66be358f6718d780000000000000000000000001b07d3344188908fb6deceac381f3ee63c48477a000000000000000000000000000000000000000000000033b768d97dcaa8000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d36269bef500003f8f21191b3f7c5982dc87f803"
      ),
    ];
    log.info(`retryableTicketId is ${calculateSubmitRetryableId(input3)}`, []);

    let mdd = Bytes.fromHexString(
      "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e42e567b36000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a7000000000000000000000000ba321653bdb2525c866d962ad66be358f6718d780000000000000000000000001b07d3344188908fb6deceac381f3ee63c48477a000000000000000000000000000000000000000000000033b768d97dcaa8000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d36269bef500003f8f21191b3f7c5982dc87f80300000000000000000000000000000000000000000000000000000000"
    );
    let res = parseTxToL2Data(mdd)
    if (res !== null) {
      log.error(`DATA: ${res.toHexString()}`, []);
    }

  });
});

// Pads a hex string with zeros to 64 characters
function padZeros(input: string): string {
  let data = strip0xPrefix(input);
  return "0x".concat(data.padStart(64, "0"));
}
