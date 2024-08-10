import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { PictureRequestMetadata } from "../../generated/schema";

export function handlePictureRequestMetadata(content: Bytes): void {
  let metadata = new PictureRequestMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    metadata.title = value.get("title")?.toString() || "Untitled Request";
    metadata.description =
      value.get("description")?.toString() || "No description available";
    metadata.imageId = value.get("imageId")?.toString() || "default-image-id";
    metadata.save();
  }
}
