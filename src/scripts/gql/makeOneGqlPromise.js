import { getClient } from "./gqlClientStore";
import gqlQueriesStrings from "./gqlQueryStrings";
import makeExtraReqPromise from "./makeExtraReqPromise";

function destructGqlResult(rawResult) {
  const keyName = Object.keys(rawResult)[0];
  return rawResult[keyName];
}

async function makeGqlRequest(query, variables) {
  const client = getClient();
  const primaryGqlResult = await client.request(query, variables);
  return primaryGqlResult;
}

async function makeOneGqlPromise(queryName) {
  const { query, variables } = gqlQueriesStrings[queryName];

  let gqlResult;
  try {
    gqlResult = await makeGqlRequest(query, variables);
  } catch {
    throw new Error(`GQL query for "${queryName}" failed`);
  }

  // Remove hierarchy in the data
  gqlResult = destructGqlResult(gqlResult);

  // Make extra requests from the primary result, creating ANOTHER array of promises to be resolved
  // It MUTATES the `edition` inside the result for us if necessary!
  const extraReqPromises = gqlResult.map((edition, index) =>
    makeExtraReqPromise(edition, index, queryName)
  );
  await Promise.all(extraReqPromises);

  // Return with the correct object structure
  return { queryName, queryType: "gql", result: gqlResult };
}

export default makeOneGqlPromise;
