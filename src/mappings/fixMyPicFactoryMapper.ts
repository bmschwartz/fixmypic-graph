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
import {
  PictureRequestMetadata as PictureRequestMetadataTemplate,
  RequestSubmissionMetadata as RequestSubmissionMetadataTemplate,
  RequestCommentMetadata as RequestCommentMetadataTemplate,
} from "../../generated/templates";

// Handle RequestCommentCreated event
export function handleRequestCommentCreated(
  event: RequestCommentCreated
): void {
  const commentAddress = event.params.comment;
  let comment = new RequestComment(commentAddress.toHex());

  comment.address = commentAddress;
  comment.request = event.params.request.toHex();
  comment.commenter = event.params.commenter;
  comment.createdAt = event.params.createdAt;
  comment.blockNumber = event.block.number;
  comment.blockTimestamp = event.block.timestamp;
  comment.transactionHash = event.transaction.hash;

  // Spawn the RequestCommentMetadata file data source
  RequestCommentMetadataTemplate.create(event.params.ipfsHash);

  comment.save();
}

// Handle PictureRequestCreated event
export function handlePictureRequestCreated(
  event: PictureRequestCreated
): void {
  const requestAddress = event.params.request;
  let request = new PictureRequest(requestAddress.toHex());

  request.address = requestAddress;
  request.budget = event.params.budget;
  request.creator = event.params.creator;
  request.createdAt = event.params.createdAt;
  request.expiresAt = event.params.expiresAt;
  request.blockNumber = event.block.number;
  request.blockTimestamp = event.block.timestamp;
  request.transactionHash = event.transaction.hash;

  // Spawn the PictureRequestMetadata file data source
  PictureRequestMetadataTemplate.create(event.params.ipfsHash);

  request.save();
}

// Handle RequestSubmissionCreated event
export function handleRequestSubmissionCreated(
  event: RequestSubmissionCreated
): void {
  const submissionAddress = event.params.submission;
  let submission = new RequestSubmission(submissionAddress.toHex());

  submission.address = submissionAddress;
  submission.request = event.params.request.toHex();
  submission.submitter = event.params.submitter;
  submission.price = event.params.price;
  submission.createdAt = event.params.createdAt;
  submission.blockNumber = event.block.number;
  submission.blockTimestamp = event.block.timestamp;
  submission.transactionHash = event.transaction.hash;

  // Spawn the RequestSubmissionMetadata file data source
  RequestSubmissionMetadataTemplate.create(event.params.ipfsHash);

  submission.save();
}

// Handle SubmissionPurchased event
export function handleSubmissionPurchased(event: SubmissionPurchased): void {
  const purchaseId = `${event.params.purchaser.toHex()}-${event.params.submission.toHex()}`;

  let purchase = new SubmissionPurchase(purchaseId);

  purchase.submission = event.params.submission.toHex();
  purchase.purchaser = event.params.purchaser;
  purchase.price = event.params.price;
  purchase.purchaseDate = event.params.purchaseDate;
  purchase.blockNumber = event.block.number;
  purchase.blockTimestamp = event.block.timestamp;
  purchase.transactionHash = event.transaction.hash;

  log.info("Saving purchase: {}", [purchase.id]);
  purchase.save();
}
