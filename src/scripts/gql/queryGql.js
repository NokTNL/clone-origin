import { initClient } from "./gqlClientStore";
import gqlQueriesStrings from "./gqlQueryStrings";
import makeOneGqlPromise from "./makeOneGqlPromise";

// This returns an ARRAY of PROMISES with the final results as values when resolved
function queryGql() {
  initClient();

  const queryNamesArr = Object.keys(gqlQueriesStrings);
  const gqlPromises = queryNamesArr.map((queryName) =>
    // `makeOneGqlPromise` will make any futher requests inside as well
    makeOneGqlPromise(queryName)
  );

  return gqlPromises;
}

export default queryGql;
