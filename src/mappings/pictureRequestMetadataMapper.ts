import { json, Bytes, dataSource, log } from "@graphprotocol/graph-ts";
import { PictureRequestMetadata } from "../../generated/schema";
import { assignValue, toString } from "./utils/mapUtils";

export function handlePictureRequestMetadata(content: Bytes): void {
  log.info("Creating picture request metadata: {}", [dataSource.stringParam()]);
  let metadata = new PictureRequestMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  log.info("Metadata: {}", [value.get("title")!.toString()]);
  log.info("Metadata: {}", [value.get("description")!.toString()]);
  log.info("Metadata: {}", [value.get("imageId")!.toString()]);

  if (value) {
    metadata.title = assignValue<string>(
      value,
      "title",
      "No title available",
      toString
    );
    metadata.description = assignValue<string>(
      value,
      "description",
      "No description available",
      toString
    );
    metadata.imageId = assignValue<string>(value, "imageId", "", toString);

    metadata.save();
  }
}
