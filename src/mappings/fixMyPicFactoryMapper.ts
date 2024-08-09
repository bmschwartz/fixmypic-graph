import { log, ipfs, json, JSONValue, TypedMap } from "@graphprotocol/graph-ts";
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

type IPFSData = TypedMap<string, JSONValue>;
const toString = (value: JSONValue): string => value.toString();

// Helper function to fetch and parse IPFS data
function fetchIPFSData(ipfsHash: string): IPFSData | null {
  log.info("Fetching data from IPFS: {}", [ipfsHash]);
  const data = ipfs.cat(ipfsHash);

  if (data) {
    log.info("Fetched data from IPFS: {}", [data.toString()]);
    return json.fromBytes(data).toObject();
  }

  log.info("Failed to fetch data from IPFS: {}", [ipfsHash]);
  return null;
}

function assignValue<T>(
  jsonData: IPFSData | null,
  key: string,
  fallback: T,
  transform: (value: JSONValue) => T
): T {
  if (jsonData && jsonData.isSet(key)) {
    const value = jsonData.get(key);
    if (value !== null) {
      return transform(value);
    }
  }
  return fallback;
}

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

  const jsonData = fetchIPFSData(event.params.ipfsHash);
  comment.text = assignValue(
    jsonData,
    "text",
    "No comment available",
    toString
  );

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

  const jsonData = fetchIPFSData(event.params.ipfsHash);
  request.title = assignValue(jsonData, "title", "Untitled Request", toString);
  request.description = assignValue(
    jsonData,
    "description",
    "No description available",
    toString
  );
  request.imageId = assignValue(
    jsonData,
    "imageId",
    "default-image-id",
    toString
  );

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

  const jsonData = fetchIPFSData(event.params.ipfsHash);
  submission.description = assignValue(
    jsonData,
    "description",
    "No description provided",
    toString
  );
  submission.freeImageId = assignValue(
    jsonData,
    "freeImageId",
    "default-free-image-id",
    toString
  );
  submission.encryptedImageId = assignValue(
    jsonData,
    "encryptedImageId",
    "default-encrypted-image-id",
    toString
  );
  submission.watermarkedImageId = assignValue(
    jsonData,
    "watermarkedImageId",
    "default-watermarked-image-id",
    toString
  );

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
