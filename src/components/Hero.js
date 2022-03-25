import styled from "styled-components";

import Banner, { BannerTitle, BannerContent, BannerBody } from "./UI/Banner";
import Button from "./UI/Button";

const StyledBannerTitle = styled(BannerTitle)`
  @media (min-width: 1080px) {
    width: 60%;
  }
`;

export default function Hero() {
  return (
    <header>
      <Banner
        imgUrl={
          "https://cdn.knownorigin.io/cdn/images/network/1/edition/9290000"
        }
      >
        <StyledBannerTitle>
          Discover rare digital art and collect NFTs
        </StyledBannerTitle>
        <BannerBody>
          <BannerContent>
            <Button color="white">
              <span className="text-6">View marketplace</span>
            </Button>
          </BannerContent>
          <BannerContent>
            <a href="#">
              Brandon Mighty x Deadfellaz Draw the Undead 2021 by Deadfellaz
            </a>
          </BannerContent>
        </BannerBody>
      </Banner>
    </header>
  );
}
