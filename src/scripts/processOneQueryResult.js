import fetchDataStore from "../store/fetchDataStore";
import processGqlResult from "./gql/processGqlResult";

function processOneQueryResult(query) {
  const { queryName, queryType, result } = query;

  let processedResult = result;
  if (queryType === "gql") {
    processedResult = processGqlResult(result);
  }
  // Assign the processed result to fetchDataStore
  fetchDataStore[queryName] = processedResult;
}

export default processOneQueryResult;
