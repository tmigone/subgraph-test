import {
  WithdrawalFinalized,
  DepositInitiated,
} from "../generated/L1GraphTokenGateway/L1GraphTokenGateway";
import {
  BridgeWithdrawalTransaction,
  BridgeDepositTransaction,
} from "../generated/schema";
import { getRetryableTicketId, getTransactionIndex } from "./helpers/bridge";
import { getDataFromEventLog } from "./helpers/event-log";

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

  entity.transactionIndex = getTransactionIndex(event);

  entity.save();
}

export function handleDepositInitiated(event: DepositInitiated): void {
  let entity = new BridgeDepositTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
  );

  entity.blockNumber = event.block.number.toI32();
  entity.timestamp = event.block.timestamp.toI32();
  entity.signer = event.params.from;
  entity.txHash = event.transaction.hash;
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.sequenceNumber = event.params.sequenceNumber.toI32();
  entity.amount = event.params.amount;
  entity.l1Token = event.params.l1Token;

  entity.retryableTicketId = getRetryableTicketId(event, entity);

  // let EVENT_SIGNATURE = "TransferRouted(address,address,address,address)";
  // let data = getDataFromEventLog(event, EVENT_SIGNATURE);
  // if (data === null) entity.save();
  entity.save()
}
