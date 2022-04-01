import { gql } from "graphql-request";

const gqlQueries = {};

//  KO server use SECONDS timestamps
const timeNow = Math.floor(Date.now() / 1000);
const timelastweek = timeNow - 7 * 24 * 3600;
const timeNextWeek = timeNow + 7 * 24 * 3600;

// This requests the banner artwork editions data (ID seems to be random)
// !!! not to be fetched, just as notes
gqlQueries.bannerArtwork = {
  query: gql`
    query bannerQuery($id: String!) {
      editions(where: { id: $id }, first: 1) {
        id
        version
        startDate
        collaborators
        artistAccount
        metadata {
          id
          name
          description
          image
          image_type
          artist
          cover_image
          cover_image_type
          image_sphere
          animation_url
          scarcity
          tags
          format
          theme
          __typename
        }
        __typename
      }
    }
  `,
  variables: {
    id: "7404000",
  },
};
// !!! deletes here because not to be fetched
delete gqlQueries.bannerArtwork;

// Upcoming sales is a combination of two queries
// 1. recentScheduledEditions - ready to buy now
gqlQueries.recentScheduledEditions = {
  query: gql`
    query editionsQuery(
      $first: Int!
      $skip: Int!
      $orderBy: String!
      $orderDirection: String!
      $startGt: Int!
      $startLt: Int!
    ) {
      recentScheduledEditions: editions(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          active: true
          startDate_gt: $startGt
          startDate_lt: $startLt
          remainingSupply_gte: 1
          reserveAuctionEndTimestamp: "0"
        }
      ) {
        id
        version
        salesType
        priceInWei
        totalSupply
        totalAvailable
        totalSold
        totalBurnt
        tokenURI
        tokenIds
        createdTimestamp
        artistAccount
        artistCommission
        optionalCommissionAccount
        optionalCommissionRate
        auctionEnabled
        collaborators
        totalEthSpentOnEdition
        offersOnly
        isGenesisEdition
        remainingSupply
        startDate
        currentStep
        active
        metadataPrice
        activeBid {
          id
          ethValue
          bidder
          __typename
        }
        sales {
          transferCount
          primaryValueInEth
          birthTimestamp
          lastTransferTimestamp
          __typename
        }
        transfers {
          id
          tokenId
          __typename
        }
        allOwners {
          id
          address
          __typename
        }
        metadata {
          id
          name
          description
          image
          image_type
          artist
          cover_image
          cover_image_type
          image_sphere
          animation_url
          scarcity
          tags
          format
          theme
          __typename
        }
        reserveAuctionSeller
        reserveAuctionBidder
        reservePrice
        reserveAuctionBid
        reserveAuctionStartDate
        previousReserveAuctionEndTimestamp
        reserveAuctionEndTimestamp
        reserveAuctionNumTimesExtended
        isReserveAuctionInSuddenDeath
        reserveAuctionTotalExtensionLengthInSeconds
        isReserveAuctionResulted
        isReserveAuctionResultedDateTime
        reserveAuctionResulter
        reserveAuctionCanEmergencyExit
        stepSaleBasePrice
        stepSaleStepPrice
        __typename
      }
    }
  `,
  variables: {
    first: 3,
    skip: 0,
    orderBy: "startDate",
    orderDirection: "desc",
    startGt: timelastweek,
    startLt: timeNow,
  },
};

// 2. soonScheduledEditions - not ready to buy yet
gqlQueries.soonScheduledEditions = {
  query: gql`
    query editionsQuery(
      $first: Int!
      $skip: Int!
      $orderBy: String!
      $orderDirection: String!
      $startGt: Int!
      $startLt: Int!
    ) {
      soonScheduledEditions: editions(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: { active: true, startDate_gt: $startGt, startDate_lt: $startLt }
      ) {
        id
        version
        salesType
        priceInWei
        totalSupply
        totalAvailable
        totalSold
        totalBurnt
        tokenURI
        tokenIds
        createdTimestamp
        artistAccount
        artistCommission
        optionalCommissionAccount
        optionalCommissionRate
        auctionEnabled
        collaborators
        totalEthSpentOnEdition
        offersOnly
        isGenesisEdition
        remainingSupply
        startDate
        currentStep
        active
        metadataPrice
        activeBid {
          id
          ethValue
          bidder
          __typename
        }
        sales {
          transferCount
          primaryValueInEth
          birthTimestamp
          lastTransferTimestamp
          __typename
        }
        transfers {
          id
          tokenId
          __typename
        }
        allOwners {
          id
          address
          __typename
        }
        metadata {
          id
          name
          description
          image
          image_type
          artist
          cover_image
          cover_image_type
          image_sphere
          animation_url
          scarcity
          tags
          format
          theme
          __typename
        }
        reserveAuctionSeller
        reserveAuctionBidder
        reservePrice
        reserveAuctionBid
        reserveAuctionStartDate
        previousReserveAuctionEndTimestamp
        reserveAuctionEndTimestamp
        reserveAuctionNumTimesExtended
        isReserveAuctionInSuddenDeath
        reserveAuctionTotalExtensionLengthInSeconds
        isReserveAuctionResulted
        isReserveAuctionResultedDateTime
        reserveAuctionResulter
        reserveAuctionCanEmergencyExit
        stepSaleBasePrice
        stepSaleStepPrice
        __typename
      }
    }
  `,
  variables: {
    first: 3,
    skip: 0,
    orderBy: "startDate",
    orderDirection: "asc",
    startGt: timeNow,
    startLt: timeNextWeek,
  },
};

// "24hr reserve autions": 2 parts
// 1. reserveAuctionsEndingSoon
gqlQueries.reserveAuctionsEndingSoon = {
  query: gql`
    query ReserveAuctionsEndingSoonQuery($timestamp: String!) {
      reserveAuctionsEndingSoon: editions(
        where: {
          active: true
          salesType: 5
          reserveAuctionEndTimestamp_gt: $timestamp
          reserveAuctionStartDate_lt: $timestamp
        }
        orderBy: reserveAuctionEndTimestamp
        orderDirection: desc
        first: 6
      ) {
        id
        version
        salesType
        priceInWei
        totalSupply
        totalAvailable
        totalSold
        totalBurnt
        tokenURI
        tokenIds
        createdTimestamp
        artistAccount
        artistCommission
        optionalCommissionAccount
        optionalCommissionRate
        auctionEnabled
        collaborators
        totalEthSpentOnEdition
        offersOnly
        isGenesisEdition
        remainingSupply
        startDate
        currentStep
        active
        metadataPrice
        activeBid {
          id
          ethValue
          bidder
          __typename
        }
        sales {
          transferCount
          primaryValueInEth
          birthTimestamp
          lastTransferTimestamp
          __typename
        }
        transfers {
          id
          tokenId
          __typename
        }
        allOwners {
          id
          address
          __typename
        }
        metadata {
          id
          name
          description
          image
          image_type
          artist
          cover_image
          cover_image_type
          image_sphere
          animation_url
          scarcity
          tags
          format
          theme
          __typename
        }
        reserveAuctionSeller
        reserveAuctionBidder
        reservePrice
        reserveAuctionBid
        reserveAuctionStartDate
        previousReserveAuctionEndTimestamp
        reserveAuctionEndTimestamp
        reserveAuctionNumTimesExtended
        isReserveAuctionInSuddenDeath
        reserveAuctionTotalExtensionLengthInSeconds
        isReserveAuctionResulted
        isReserveAuctionResultedDateTime
        reserveAuctionResulter
        reserveAuctionCanEmergencyExit
        stepSaleBasePrice
        stepSaleStepPrice
        __typename
      }
    }
  `,
  variables: {
    timestamp: timeNow.toString(),
  },
};

// (2. reserveAuctionsStartingSoon) (Update 1/4/2022: this query is not used anymore, do not use!)
gqlQueries.reserveAuctionsStartingSoon = {
  query: gql`
    query reserveAuctionsStartingSoonQuery($timestamp: String!, $first: Int!) {
      reserveAuctionsStartingSoon: editions(
        where: {
          active: true
          salesType: 5
          reserveAuctionStartDate_gt: $timestamp
        }
        orderBy: reserveAuctionStartDate
        orderDirection: asc
        first: $first
      ) {
        id
        version
        salesType
        priceInWei
        totalSupply
        totalAvailable
        totalSold
        totalBurnt
        tokenURI
        tokenIds
        createdTimestamp
        artistAccount
        artistCommission
        optionalCommissionAccount
        optionalCommissionRate
        auctionEnabled
        collaborators
        totalEthSpentOnEdition
        offersOnly
        isGenesisEdition
        remainingSupply
        startDate
        currentStep
        active
        metadataPrice
        activeBid {
          id
          ethValue
          bidder
          __typename
        }
        sales {
          transferCount
          primaryValueInEth
          birthTimestamp
          lastTransferTimestamp
          __typename
        }
        transfers {
          id
          tokenId
          __typename
        }
        allOwners {
          id
          address
          __typename
        }
        metadata {
          id
          name
          description
          image
          image_type
          artist
          cover_image
          cover_image_type
          image_sphere
          animation_url
          scarcity
          tags
          format
          theme
          __typename
        }
        reserveAuctionSeller
        reserveAuctionBidder
        reservePrice
        reserveAuctionBid
        reserveAuctionStartDate
        previousReserveAuctionEndTimestamp
        reserveAuctionEndTimestamp
        reserveAuctionNumTimesExtended
        isReserveAuctionInSuddenDeath
        reserveAuctionTotalExtensionLengthInSeconds
        isReserveAuctionResulted
        isReserveAuctionResultedDateTime
        reserveAuctionResulter
        reserveAuctionCanEmergencyExit
        stepSaleBasePrice
        stepSaleStepPrice
        __typename
      }
    }
  `,
  variables: {
    timestamp: timeNow.toString(),
    first: 4,
  },
};
/* !!! This query is deleted */
delete gqlQueries.reserveAuctionsStartingSoon;

// This queries the latest X artworks
gqlQueries.latestArtwork = {
  query: gql`
    query editionsQuery(
      $first: Int!
      $skip: Int!
      $orderBy: String!
      $orderDirection: String!
    ) {
      editions(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: { active: true, startDate: 0, remainingSupply_gte: 1 }
      ) {
        id
        version
        salesType
        priceInWei
        totalSupply
        totalAvailable
        totalSold
        totalBurnt
        tokenURI
        tokenIds
        createdTimestamp
        artistAccount
        artistCommission
        optionalCommissionAccount
        optionalCommissionRate
        auctionEnabled
        collaborators
        totalEthSpentOnEdition
        offersOnly
        isGenesisEdition
        remainingSupply
        startDate
        currentStep
        active
        metadataPrice
        activeBid {
          id
          ethValue
          bidder
          __typename
        }
        sales {
          transferCount
          primaryValueInEth
          birthTimestamp
          lastTransferTimestamp
          __typename
        }
        transfers {
          id
          tokenId
          __typename
        }
        allOwners {
          id
          address
          __typename
        }
        metadata {
          id
          name
          description
          image
          image_type
          artist
          cover_image
          cover_image_type
          image_sphere
          animation_url
          scarcity
          tags
          format
          theme
          __typename
        }
        reserveAuctionSeller
        reserveAuctionBidder
        reservePrice
        reserveAuctionBid
        reserveAuctionStartDate
        previousReserveAuctionEndTimestamp
        reserveAuctionEndTimestamp
        reserveAuctionNumTimesExtended
        isReserveAuctionInSuddenDeath
        reserveAuctionTotalExtensionLengthInSeconds
        isReserveAuctionResulted
        isReserveAuctionResultedDateTime
        reserveAuctionResulter
        reserveAuctionCanEmergencyExit
        stepSaleBasePrice
        stepSaleStepPrice
        __typename
      }
    }
  `,
  variables: {
    first: 25,
    skip: 0,
    orderBy: "createdTimestamp",
    orderDirection: "desc",
  },
};

export default gqlQueries;
