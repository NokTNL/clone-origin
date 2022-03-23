import { gql } from "graphql-request";

//  KO server use SECONDS timestamps
const timeNow = Math.floor(Date.now() / 1000);
const timeTomorrow = timeNow + 24 * 3600;
const timeNextWeek = timeNow + 7 * 24 * 3600;

// This requests the banner artwork editions data (ID seems to be random)
const bannerArtwork = {
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

// Upcoming sales is a combination of two queries
// 1. recentScheduledEditions - ready to buy now
const recentScheduledEditions = {
  query: gql`
    query editionsQuery(
      $first: Int!
      $skip: Int!
      $orderBy: String!
      $orderDirection: String!
      $startGt: String!
      $startLt: String!
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
    startGt: timeNow.toString(),
    startLt: timeTomorrow.toString(),
  },
};

// 2. soonScheduledEditions - not ready to buy yet
const soonScheduledEditions = {
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
const reserveAuctionsEndingSoon = {
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
    timestamp: timeTomorrow.toString(),
    first: 5,
  },
};

// 2. reserveAuctionsStartingSoon
const reserveAuctionsStartingSoon = {
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

// This queries the latest X artworks
const latestArtworks = {
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

const gqlQueries = {
  bannerArtwork,
  recentScheduledEditions,
  soonScheduledEditions,
  latestArtworks,
  reserveAuctionsEndingSoon,
  reserveAuctionsStartingSoon,
};
export default gqlQueries;
