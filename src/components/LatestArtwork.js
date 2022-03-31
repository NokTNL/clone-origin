import ArtworkCard from "./UI/ArtworkCard";
import ArtworkGrid from "./UI/ArtworkGrid";
import Button from "./UI/Button";
import Section, { SectionHeader, SectionFooter } from "./UI/Section";

export default function LatestArtwork() {
  // Which group of data to retrieve info from dataStore.js
  const targetData = "latestArtwork";

  return (
    <Section>
      <SectionHeader>Latest Artwork</SectionHeader>
      <ArtworkGrid>
        {[0, 1, 2].map((index) => (
          <ArtworkCard key={index} index={index} targetData={targetData} />
        ))}
      </ArtworkGrid>
      <SectionFooter>
        <a href="https://knownorigin.io/marketplace?sale_type_reserve_countdown_auction=true">
          <Button color="primary">
            <span className="text-6">View upcoming sales</span>
          </Button>
        </a>
      </SectionFooter>
    </Section>
  );
}
