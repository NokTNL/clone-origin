import { GraphQLClient } from "graphql-request";

let _client;

export function getClient() {
  return _client;
}

export function initClient() {
  _client = new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/knownorigin/known-origin"
  );
}
