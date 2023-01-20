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

describe("Describe entity assertions", () => {
  test("test", () => {
    let input = [
      "0x066EED",
      "0xd940f7b51C3e593D709BA3de1B3a0d233d1DFDb2",
      "0x0000000000000000000000000000000000000000000000000000000000007A12",
      "0x020ECA945D",
      "0xef2757855d2802bA53733901F90C91645973f743",
      "0x",
      "0x7894bf4ae940",
      "0x5a41144b4240",
      "0xEfc519BEd6a43a14f1BBBbA9e796C4931f7A5540",
      "0xEfc519BEd6a43a14f1BBBbA9e796C4931f7A5540",
      "0x01b22d",
      "0x11e1a300",
      "0x2e567b360000000000000000000000005c946740441c12510a167b447b7de565c20b9e3c000000000000000000000000efc519bed6a43a14f1bbbba9e796c4931f7a5540000000000000000000000000efc519bed6a43a14f1bbbba9e796c4931f7a5540000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000",
    ];

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
  });
});
