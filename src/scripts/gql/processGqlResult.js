function restructure(edition) {
  const {
    id: artworkId,
    artistAccount: artistAddr,
    metadata: { name: artworkName, artist: artistName },
    auctionEnabled: isBidOnly,
    bidOnlyReservePrice,
    metadataPrice,
    reservePrice,
    totalAvailable: totalAvai,
    startDate: startTime,
    stepSaleStepPrice: priceStep,
    reserveAuctionStartDate: reserveAuctionStartTime,
    reserveAuctionEndTimestamp: reserveAuctionEndTime,
    reserveAuctionBid,
  } = edition;

  return {
    artworkInfo: {
      artworkName,
      artworkId,
      artistName,
      artistAddr,
      totalAvai,
    },
    auctionInfo: {
      isBidOnly,
      bidOnlyReservePrice,
      reservePrice,
      metadataPrice,
      startTime,
      priceStep,
      reserveAuctionStartTime,
      reserveAuctionEndTime,
      reserveAuctionBid,
    },
  };
}

function stringToNum(edition) {
  // Regex for recognising blockchain addresses
  const addrRegex = /^0x[0-9a-f]+$/i;

  for (const property in edition) {
    for (const subProperty in edition[property]) {
      const testValue = edition[property][subProperty];
      const isAddr = addrRegex.test(testValue);
      const isNumber = testValue === "0" || parseInt(testValue);
      // Only convert strings that are numbers but not blockchain addresses ("0xXXXXX")
      if (!isAddr && isNumber) {
        edition[property][subProperty] = parseInt(testValue);
      }
    }
  }
}

function convert(edition) {
  // 1. Data extraction & restructuring for each edition
  const restructEdition = restructure(edition);
  // 2. Convert all string-notated numbers into real numbers (MUTATING)
  stringToNum(restructEdition);
  return restructEdition;
}

function processGqlResult(result) {
  const convertedQueryResult = result.map((edition) => convert(edition));
  return convertedQueryResult;
}

export default processGqlResult;
