import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import data from "../../store/fetchDataStore";

const StyledAuctionInfo = styled.section`
  border-top: 1px solid #dcdcdc;
  padding: 1rem 1.5rem;

  display: flex;

  background-color: ${({ isReserveAuctionEnding }) =>
    isReserveAuctionEnding && "#190921"};

  & * {
    font-weight: ${({ isReserveAuctionEnding }) =>
      isReserveAuctionEnding ? 500 : 600};
    color: ${({ isReserveAuctionEnding }) => isReserveAuctionEnding && "white"};
  }
`;

const Col = styled.div`
  flex: 1;
  padding-left: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ColoredSpan = styled.span`
  color: ${({ color }) => {
    switch (color) {
      case "dim":
        return "#757575";
      case "alert":
        return "#f7623f";
      default:
        return "inherit";
    }
  }};
`;

export default function AuctionInfo({ index, targetData }) {
  const {
    isBidOnly,
    bidOnlyReservePrice,
    reservePrice,
    metadataPrice,
    startTime,
    priceStep,
    reserveAuctionStartTime,
    reserveAuctionEndTime,
    reserveAuctionBid,
  } = data[targetData][index].auctionInfo;

  /* For tweaking the whole component's styling */
  let isReserveAuctionEnding = false;

  /* For countdown timers */
  const timeNow = useSelector((state) => state.timeNow);
  // initialTimeNow represents the time when it was first rendered and will stay the same
  const [initialTimeNow] = useState(Date.now);
  // Helper functions
  // padZeros: for padding zeros in time units
  const padZeros = (num, places) => String(num).padStart(places, "0");
  // createTimeDiff: returns time difference in hh:mm:ss format
  const createTimeDiff = (timeInput, timeNow) => {
    const rawTimeDiff = new Date(parseInt(timeInput * 1000) - timeNow);
    const h = padZeros(rawTimeDiff.getUTCHours(), 2);
    const m = padZeros(rawTimeDiff.getUTCMinutes(), 2);
    const s = padZeros(rawTimeDiff.getUTCSeconds(), 2);
    return { h, m, s };
  };

  /* Generating text and styling for the first column */
  const firstColData = { title: "", extraTitle: "", subtitle: "" };
  const firstColColor = { title: "", extraTitle: "", subtitle: "" };
  // Test if is "Bid only" edition
  if (isBidOnly) {
    firstColData.title = "Place a bid";
    // Test if there is a bid-only reserve price
    if (bidOnlyReservePrice === 0) {
      firstColData.subtitle = "No reserve";
      firstColColor.subtitle = "dim";
    } else {
      firstColData.extraTitle = " (minimum)";
      firstColColor.extraTitle = "dim";
      firstColData.subtitle = `Ξ ${bidOnlyReservePrice / 1000000000000000000}`;
    }
  }
  // if not bid only, check if a normal sales reserve price is available
  else {
    if (reservePrice === 0) {
      firstColData.title = "Buy now";
      firstColData.subtitle = `Ξ ${metadataPrice / 1000000000000000000}`;
    } else {
      firstColData.title = "Reserve price";
      firstColData.subtitle = `Ξ ${reservePrice / 1000000000000000000}`;
    }
  }

  /* Generating text and styling for the second column (sometimes overridde first column info) */
  const secondColData = { title: "", subtitle: "" };
  const secondColColor = { title: "", subtitle: "" };
  // --> Check if it is a soon-ending reserve auction, this info take precedance
  //    - if both reserveAuctionStartTime and reserveAuctionEndTime exists,
  //    reserveAuctionEndTime takes precedance and display "Ending soon")
  if (reserveAuctionEndTime !== 0) {
    // Change the whole AuctionInfo's styling
    isReserveAuctionEnding = true;

    firstColData.title = "Current bid";
    firstColData.extraTitle = "";
    firstColData.subtitle = `Ξ ${reserveAuctionBid / 1000000000000000000}`;
    secondColData.title = "Auction ends in";
    const { h, m, s } = createTimeDiff(reserveAuctionEndTime, timeNow);
    secondColData.subtitle = `${h} h ${m} m ${s} s`;
  }
  // if no "reserveAuctionEndTime" but has a "reserveAuctionStartTime", then it is a soon starting reserve auction
  else if (reserveAuctionStartTime !== 0) {
    secondColData.title = "Starts in";
    const { h, m, s } = createTimeDiff(reserveAuctionStartTime, timeNow);
    secondColData.subtitle = `${h} h ${m} m ${s} s`;
  }
  // if both reserve auction start/end time not available then it is not a reserve auction
  // Add info depends on whether the sale has started or not
  else if (startTime !== 0) {
    // If the sale is yet to start
    if (startTime * 1000 > initialTimeNow) {
      secondColData.title = "Starts in";
      // This will renew every second with "timeNow"
      const { h, m, s } = createTimeDiff(startTime, timeNow);
      secondColData.subtitle = `${h} h ${m} m ${s} s`;
    }
    // If the sale has started
    else {
      // Check if it is a step sale and show step price if available
      if (priceStep !== 0) {
        secondColData.title = "Next price";
        secondColColor.title = "dim";
        secondColData.subtitle = `Ξ ${
          (metadataPrice + priceStep) / 1000000000000000000
        }`;
        secondColColor.subtitle = "alert";
      }
    }
  }

  return (
    <StyledAuctionInfo isReserveAuctionEnding={isReserveAuctionEnding}>
      <Col>
        <ColoredSpan color={firstColColor.title}>
          {firstColData.title}
          <ColoredSpan color={firstColColor.extraTitle}>
            {firstColData.extraTitle}
          </ColoredSpan>
        </ColoredSpan>
        <ColoredSpan color={firstColColor.subtitle}>
          {firstColData.subtitle}
        </ColoredSpan>
      </Col>
      <Col>
        <ColoredSpan color={secondColColor.title}>
          {secondColData.title}
        </ColoredSpan>
        <ColoredSpan color={secondColColor.subtitle}>
          {secondColData.subtitle}
        </ColoredSpan>
      </Col>
    </StyledAuctionInfo>
  );
}
