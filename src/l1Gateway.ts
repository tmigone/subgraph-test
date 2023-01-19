import { WithdrawalFinalized } from "../generated/L1GraphTokenGateway/L1GraphTokenGateway";
import { BridgeWithdrawalTransaction } from "../generated/schema";
import {
  Address,
  ByteArray,
  Bytes,
  BigInt,
  log,
  crypto,
  ethereum,
} from "@graphprotocol/graph-ts";
import { getTransactionIndex, getTransactionIndexFromCalldata, getTransactionIndexFromLogs } from "./bridgeHelpers";

export function handleWithdrawalFinalized(event: WithdrawalFinalized): void {
  let entity = new BridgeWithdrawalTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
  );

  entity.blockNumber = event.block.number.toI32();
  entity.timestamp = event.block.timestamp.toI32();
  entity.signer = event.params.from;
  entity.txHash = event.transaction.hash;
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.exitNum = event.params.exitNum.toI32();
  entity.amount = event.params.amount;
  entity.l1Token = event.params.l1Token;
  entity.input = event.transaction.input;

  entity.transactionIndexCallData = getTransactionIndexFromCalldata(event);
  entity.transactionIndexEvent = getTransactionIndexFromLogs(event);
  entity.transactionIndex = getTransactionIndex(event);
  entity.save();
}

function strip0xPrefix(input: string): string {
  return input.startsWith("0x") ? input.slice(2) : input;
}

