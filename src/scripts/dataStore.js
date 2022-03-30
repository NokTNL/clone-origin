const data = {};

// !!! These are example data and will be overwritten by dataLoader.js
// !!! They are kept here for explanation purpose
data.latestArtwork = new Array(3).fill({
  artworkInfo: {
    artworkName: `''untitled (Orange, Red, and Blue), 1959''`,
    artworkId: 9795000,
    artistName: `Mical Noelson`,
    artistAddr: "0xdbc70388645d6b756567b6dee36e53654cf081bd",
    totalAvai: 20,
  },
  auctionInfo: {
    /* First column of AuctionInfo */
    // isBidOnly: means it is a "Bid only" edition, displays "Place a bid" title
    isBidOnly: true,
    // isBidOnly: false,
    // For "Bid only", shows its reserve price if present; if reserve price == "0", shows "No reserve"
    bidOnlyReservePrice: 70000000000000000,
    // bidOnlyReservePrice: 0,
    // Below is only relavant if isBidOnly == false
    // reservePrice: if !== 0 it is reserved, displays reserve price; otherwise means no reservation ("Buy now") and displays metadataPrice
    reservePrice: 0,
    metadataPrice: 270000000000000000,

    /* Second column of AuctionInfo */
    // --> Case 1 : not reserve auction
    // startTime: the time of sales start (= 0 in reserve auctions)
    // If < Date.now(), the sales has started and second column is unchanged
    // If > Date.now(), the sales is starting soon; second column shows "Starts in hh:mm:ss"
    // startTime: 1648627200,
    // startTime: 1548627200,
    startTime: 0,
    // priceStep: present only after sales starts (startTime < Date.now() ) AND when the sales is a step sale
    priceStep: 30000000000000000,
    // --> Case 2 : reserve auction
    // reserveAuctionStartTime: a reserve auction is starting soon (> Date.now()) (does not coexist with reserveAuctionEndTime)
    reserveAuctionStartTime: 0,
    // reserveAuctionStartTime: 1648576825,
    // reserveAuctionEndTime: a reserve auction is ending soon (> Date.now()) (does not coexist with reserveAuctionStartTime)
    reserveAuctionEndTime: 1648576825,
    // reserveAuctionBid: if an auction is active (reserveAuctionEndTime > Date.now()), then this is the latest bid
    reserveAuctionBid: 95000000000000000,
  },
});

export default data;
