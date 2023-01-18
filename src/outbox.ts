import { OutBoxTransactionExecuted } from "../generated/Outbox/Outbox";
import { BridgeWithdrawalTransaction } from "../generated/schema";
import {
  Address,
  ByteArray,
  Bytes,
  BigInt,
  log,
} from "@graphprotocol/graph-ts";

export function handleOutBoxTransactionExecuted(
  event: OutBoxTransactionExecuted
): void {
  // Only handle the event if the tx destination is the graph gateway
  if (
    event.params.to !=
    Address.fromString("0x01cDC91B0A9bA741903aA3699BF4CE31d6C5cC06")
  ) {
    return;
  }

  let entity = new BridgeWithdrawalTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
  );

  entity.blockNumber = event.block.number.toI32();
  entity.timestamp = event.block.timestamp.toI32();
  entity.txHash = event.transaction.hash;
  entity.transactionIndex = event.params.transactionIndex;

  // Loop through the receipt logs to find the WithdrawalFinalized event which cointains the data we need
  // This event should always exist on the same tx as the OutBoxTransactionExecuted as long as the tx destination is the graph gateway
  let receipt = event.receipt;
  let eventFound = false;
  if (receipt && receipt.logs.length > 0) {
    let logs = receipt.logs;

    for (let i = 0; i < logs.length; i++) {
      let topics = logs[i].topics;

      // WithdrawalFinalized event
      if (
        topics[0].toHexString() ==
          "0x891afe029c75c4f8c5855fc3480598bc5a53739344f6ae575bdb7ea2a79f56b3" &&
        topics.length >= 4
      ) {
        eventFound = true;

        entity.signer = bytes32ToAddress(topics[1]);
        entity.from = bytes32ToAddress(topics[1]);
        entity.to = bytes32ToAddress(topics[2]);
        entity.exitNum = topics[3].toI32();
        entity.datas = logs[i].data;

        // Parse data to get l1Token and amount
        let data = logs[i].data;
        if (data.length === 64) {
          let hexStringData = strip0xPrefix(data.toHexString());

          let l1TokenBytes = Bytes.fromHexString(hexStringData.substr(0, 64));
          entity.l1Token = bytes32ToAddress(l1TokenBytes);

          let amountBytes = Bytes.fromHexString(hexStringData.substr(64, 64));
          entity.amount = BigInt.fromUnsignedBytes(
            amountBytes.reverse() as Bytes
          );
        } else {
          log.error("Invalid data length", [
            data.length.toString(),
            data.toHexString(),
          ]);
        }
      }
    }
  } else {
    log.error("Could not find transaction receipt!", []);
  }

  if (!eventFound) {
    log.error("Could not find WithdrawalFinalized event!", []);
  }

  entity.save();
}

// Converts a left padded 32 Bytes to an address
// Example:
// - Input > 0x000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a7
// - Output> 0xc944e90c64b2c07662a292be6244bdf05cda44a7
function bytes32ToAddress(bytes: Bytes): Bytes {
  if (bytes.length !== 32) {
    log.warning("bytes32ToAddress: invalid bytes length", [
      bytes.length.toString(),
    ]);
  }
  return Address.fromHexString(
    strip0xPrefix(bytes.toHexString()).substr(24, 40)
  );
}

function strip0xPrefix(input: string): string {
  return input.startsWith("0x") ? input.slice(2) : input;
}
