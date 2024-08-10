import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { RequestCommentMetadata } from "../../generated/schema";
import { assignValue, toString } from "./utils/mapUtils";

export function handleRequestCommentMetadata(content: Bytes): void {
  let metadata = new RequestCommentMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    metadata.text = assignValue<string>(
      value,
      "text",
      "No comment available",
      toString
    );

    metadata.save();
  }
}
