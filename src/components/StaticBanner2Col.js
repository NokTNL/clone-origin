import Banner2Col, { Banner2ColBody, Banner2ColTitle } from "./UI/Banner2Col";
import Button from "./UI/Button";
import data from "../store/staticBannerData";

export default function StaticBanner2Col({ index }) {
  const { theme, title, content, link, buttonText } = data[index];

  const bgColor = (function () {
    switch (theme) {
      case "dark":
        return "#190921";
      case "grey":
        return "#1f1f1f";
      default:
        return "white";
    }
  })();
  const textColor = (function () {
    switch (theme) {
      case "dark":
        return "white";
      case "grey":
        return "white";
      default:
        return "black";
    }
  })();

  return (
    <section>
      <Banner2Col bgColor={bgColor} textColor={textColor}>
        <Banner2ColTitle>{title}</Banner2ColTitle>
        <Banner2ColBody>
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <a href={link}>
            <Button color={textColor}>
              <span className="text-6">{buttonText}</span>
            </Button>
          </a>
        </Banner2ColBody>
      </Banner2Col>
    </section>
  );
}
