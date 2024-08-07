import { log } from "@graphprotocol/graph-ts";

import {
  RequestCommentCreated,
  PictureRequestCreated,
  RequestSubmissionCreated,
  SubmissionPurchased,
} from "../../generated/FixMyPicFactory/FixMyPicFactory";
import {
  RequestComment,
  PictureRequest,
  RequestSubmission,
  SubmissionPurchase,
} from "../../generated/schema";

// Handle RequestCommentCreated event
export function handleRequestCommentCreated(
  event: RequestCommentCreated
): void {
  const commentAddress = event.params.comment;

  let comment = new RequestComment(commentAddress.toHex());
  comment.address = commentAddress;
  comment.request = event.params.request.toHex();
  comment.commenter = event.params.commenter;
  comment.text = event.params.text;
  comment.createdAt = event.params.createdAt;
  comment.blockNumber = event.block.number;
  comment.blockTimestamp = event.block.timestamp;
  comment.transactionHash = event.transaction.hash;
  comment.save();
}

// Handle PictureRequestCreated event
export function handlePictureRequestCreated(
  event: PictureRequestCreated
): void {
  log.info("handlePictureRequestCreated: {}", [event.params.title]);

  const requestAddress = event.params.request;

  let request = new PictureRequest(requestAddress.toHex());
  request.address = requestAddress;
  request.title = event.params.title;
  request.description = event.params.description;
  request.imageId = event.params.imageId;
  request.budget = event.params.budget;
  request.creator = event.params.creator;
  request.createdAt = event.params.createdAt;
  request.expiresAt = event.params.expiresAt;
  request.blockNumber = event.block.number;
  request.blockTimestamp = event.block.timestamp;
  request.transactionHash = event.transaction.hash;

  log.info("handlePictureRequestCreated: saving request {}", [
    requestAddress.toHex(),
  ]);

  request.save();
}

// Handle RequestSubmissionCreated event
export function handleRequestSubmissionCreated(
  event: RequestSubmissionCreated
): void {
  log.info("handleRequestSubmissionCreated: {}", [event.params.description]);
  const submissionAddress = event.params.submission;

  let submission = new RequestSubmission(submissionAddress.toHex());
  submission.address = submissionAddress;
  submission.request = event.params.request.toHex();
  submission.submitter = event.params.submitter;
  submission.price = event.params.price;
  submission.description = event.params.description;
  submission.createdAt = event.params.createdAt;
  submission.freeImageId = event.params.freeImageId;
  submission.encryptedImageId = event.params.encryptedImageId;
  submission.watermarkedImageId = event.params.watermarkedImageId;
  submission.blockNumber = event.block.number;
  submission.blockTimestamp = event.block.timestamp;
  submission.transactionHash = event.transaction.hash;

  log.info("handleRequestSubmissionCreated: saving submission {}", [
    submission.id,
  ]);

  submission.save();
}

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
