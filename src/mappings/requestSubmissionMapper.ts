import { log } from "@graphprotocol/graph-ts";

import { SubmissionPurchased } from "../../generated/templates/RequestSubmission/RequestSubmission";
import { SubmissionPurchase } from "../../generated/schema";

export function handleSubmissionPurchased(event: SubmissionPurchased): void {
  const purchaser = event.params.purchaser;
  const submission = event.params.submission;
  const price = event.params.price;
  const purchaseId = `${purchaser.toHex()}-${submission.toHex()}`;

  log.info("handleSubmissionPurchased: {} {}", [
    submission.toHex(),
    price.toString(),
  ]);

  let purchase = new SubmissionPurchase(purchaseId);
  purchase.submission = submission.toHex();
  purchase.purchaser = purchaser;
  purchase.price = price;
  purchase.purchaseDate = event.params.purchaseDate;
  purchase.blockNumber = event.block.number;
  purchase.blockTimestamp = event.block.timestamp;
  purchase.transactionHash = event.transaction.hash;

  log.info("handleSubmissionPurchased: saving purchase {}", [purchase.id]);

  purchase.save();
}
