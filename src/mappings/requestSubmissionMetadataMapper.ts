import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { RequestSubmissionMetadata } from "../../generated/schema";
import { assignValue, toString } from "./utils/mapUtils";

export function handleRequestSubmissionMetadata(content: Bytes): void {
  let metadata = new RequestSubmissionMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    metadata.description = assignValue<string>(
      value,
      "description",
      "No description available",
      toString
    );
    metadata.freeImageId = assignValue<string>(
      value,
      "freeImageId",
      "",
      toString
    );
    metadata.encryptedImageId = assignValue<string>(
      value,
      "encryptedImageId",
      "",
      toString
    );
    metadata.watermarkedImageId = assignValue<string>(
      value,
      "watermarkedImageId",
      "",
      toString
    );

    metadata.save();
  }
}
