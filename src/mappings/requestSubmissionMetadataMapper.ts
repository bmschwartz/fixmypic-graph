import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { RequestSubmissionMetadata } from "../../generated/schema";

export function handleRequestSubmissionMetadata(content: Bytes): void {
  let metadata = new RequestSubmissionMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    metadata.description =
      value.get("description")?.toString() || "No description provided";
    metadata.freeImageId = value.get("freeImageId")?.toString() || "";
    metadata.encryptedImageId = value.get("encryptedImageId")?.toString() || "";
    metadata.watermarkedImageId =
      value.get("watermarkedImageId")?.toString() || "";
    metadata.save();
  }
}
