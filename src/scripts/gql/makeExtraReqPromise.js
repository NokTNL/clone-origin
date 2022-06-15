async function makeReq(artworkId) {
  const response = await fetch(
    `https://us-central1-known-origin-io.cloudfunctions.net/main/api/network/1/reserve/edition/${artworkId}`
  );
  if (!response.ok) {
    throw new Error();
  }
  const extraResult = await response.json();
  return extraResult;
}

async function makeExtraReqPromise(edition, index, queryName) {
  // Fetch "bidOnlyReservePrice" for each edition if it is a bid-only edition
  const { auctionEnabled: isBidOnly, id: artworkId } = edition;
  if (isBidOnly) {
    let extraResult;
    try {
      extraResult = makeReq(artworkId);
    } catch {
      throw new Error(
        `fetch "bidOnlyReservePrice" for ${queryName} edition ${index} failed`
      );
    }
    edition.bidOnlyReservePrice = extraResult.eth_reserve_in_wei || "0";
  } else {
    edition.bidOnlyReservePrice = "0";
  }
}

export default makeExtraReqPromise;
