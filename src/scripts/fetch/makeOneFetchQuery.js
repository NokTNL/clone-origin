import fetchEndpoints from "./fetchEndpoints";

async function makeQuery(endpoint) {
  const response = await fetch(fetchEndpoints[endpoint]);
  if (!response.ok) {
    throw new Error(`fetch "${endpoint}" returns bad HTTP status`);
  }
  const result = await response.json();

  return result;
}

function destructResult(rawResult) {
  const keyName = Object.keys(rawResult)[0];
  const cleanResult = rawResult[keyName];
  return cleanResult;
}

async function makeOneFetchQuery(endpoint) {
  const primaryResult = await makeQuery(endpoint).catch((err) => {
    console.error(`makeOneFetchQuery: fetch for endpoint ${endpoint} failed`);
    throw err;
  });
  const cleanResult = destructResult(primaryResult);

  // Return in the correct object format
  return {
    queryName: endpoint,
    queryType: "fetch",
    result: cleanResult,
  };
}
export default makeOneFetchQuery;
