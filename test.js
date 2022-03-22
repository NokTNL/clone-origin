query ReserveAuctionsEndingSoonQuery($timestamp: String!) {
    reserveAuctionsEndingSoon: editions(where: {active: true, salesType: 5, reserveAuctionEndTimestamp_gt: $timestamp, reserveAuctionStartDate_lt: $timestamp}, orderBy: reserveAuctionEndTimestamp, orderDirection: desc, first: 6) {
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
  