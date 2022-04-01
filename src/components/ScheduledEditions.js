import ArtworkCard from "./UI/ArtworkCard";
import ArtworkGrid from "./UI/ArtworkGrid";
import Button from "./UI/Button";
import Section, { SectionHeader, SectionFooter } from "./UI/Section";
import data from "../store/fetchDataStore";

export default function ScheduledEditions() {
  const queries = ["recentScheduledEditions", "soonScheduledEditions"];

  const lengthOf = {};
  queries.forEach(
    (queryName) => (lengthOf[queryName] = data[queryName].length)
  );

  return (
    <Section>
      <SectionHeader>Upcoming sales</SectionHeader>
      <ArtworkGrid>
        {/* This renders an array of arrays */}
        {queries.map(
          // For each query render an array of <ArtwordCard>
          (query) =>
            new Array(lengthOf[query])
              .fill()
              .map((item, index) => (
                <ArtworkCard key={index} index={index} targetData={query} />
              ))
        )}
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
