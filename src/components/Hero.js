import Banner, { BannerTitle, BannerContent, BannerBody } from "./UI/Banner";
import Button from "./UI/Button";

export default function Hero() {
  return (
    <header>
      <Banner
        imgUrl={
          "https://cdn.knownorigin.io/cdn/images/network/1/edition/9290000"
        }
      >
        <BannerTitle>Discover rare digital art and collect NFTs</BannerTitle>
        <BannerBody>
          <BannerContent>
            <a href="https://knownorigin.io/marketplace">
              <Button color="white">
                <span className="text-6">View marketplace</span>
              </Button>
            </a>
          </BannerContent>
          <BannerContent>
            <a href="https://knownorigin.io/gallery/9290000-brandon-mighty-x-deadfellaz-draw-the-undead-2021">
              Brandon Mighty x Deadfellaz Draw the Undead 2021 by Deadfellaz
            </a>
          </BannerContent>
        </BannerBody>
      </Banner>
    </header>
  );
}
