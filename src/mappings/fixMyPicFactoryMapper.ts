import {
  RequestCommentCreated,
  PictureRequestCreated,
  RequestSubmissionCreated,
} from "../../generated/FixMyPicFactory/FixMyPicFactory";
import {
  RequestComment,
  PictureRequest,
  RequestSubmission,
} from "../../generated/schema";

// Handle RequestCommentCreated event
export function handleRequestCommentCreated(
  event: RequestCommentCreated
): void {
  let comment = new RequestComment(
    event.params.request.toHex() +
      "-" +
      event.params.commenter.toHex() +
      "-" +
      event.block.timestamp.toString()
  );
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
  let request = new PictureRequest(
    event.params.creator.toHex() + "-" + event.params.createdAt.toString()
  );
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
  request.save();
}

// Handle RequestSubmissionCreated event
export function handleRequestSubmissionCreated(
  event: RequestSubmissionCreated
): void {
  let submission = new RequestSubmission(
    event.params.request.toHex() +
      "-" +
      event.params.submitter.toHex() +
      "-" +
      event.block.timestamp.toString()
  );
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
  submission.save();
}
