import fetchEndpoints from "./fetchEndpoints";
import makeOneFetchQuery from "./makeOneFetchQuery";

function makeFetchQueries() {
  const fetchPromises = Object.keys(fetchEndpoints).map((endpoint) =>
    makeOneFetchQuery(endpoint)
  );
  return fetchPromises;
}

export default makeFetchQueries;
