import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { RequestCommentMetadata } from "../../generated/schema";

export function handleRequestCommentMetadata(content: Bytes): void {
  let metadata = new RequestCommentMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    metadata.text = value.get("text")?.toString() || "No comment available";
    metadata.save();
  }
}
