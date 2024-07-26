import { SubmissionPurchased } from "../../generated/templates/RequestSubmission/RequestSubmission";
import { SubmissionPurchase } from "../../generated/schema";

export function handleSubmissionPurchased(event: SubmissionPurchased): void {
  let purchase = new SubmissionPurchase(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  purchase.submission = event.params.submission.toHex();
  purchase.purchaser = event.params.purchaser;
  purchase.purchaseDate = event.params.purchaseDate;
  purchase.blockNumber = event.block.number;
  purchase.blockTimestamp = event.block.timestamp;
  purchase.transactionHash = event.transaction.hash;
  purchase.save();
}
