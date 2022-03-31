import Banner, { BannerTitle, BannerContent, BannerBody } from "./UI/Banner";
import Button from "./UI/Button";
import data from "../store/fetchDataStore";

export default function DynamicBanner({ index }) {
  const { backgroundimage, title, buttonLabel, link } = data.bannersUrl[index];

  return (
    <section>
      <Banner imgUrl={backgroundimage}>
        <BannerTitle>{title}</BannerTitle>
        <BannerBody>
          <BannerContent>
            <a href={`https://knownorigin.io/${link}`}>
              <Button color="white">
                <span className="text-6">{buttonLabel}</span>
              </Button>
            </a>
          </BannerContent>
        </BannerBody>
      </Banner>
    </section>
  );
}
