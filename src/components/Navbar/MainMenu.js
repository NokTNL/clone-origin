import styled from "styled-components";

import MenuItem from "./MenuItem";
import { breakpoint } from "./variables";

const StyledMenu = styled.ul`
  @media (min-width: ${breakpoint}) {
    display: flex;
  }
`;

const SpecialMenuItem = styled(MenuItem)`
  @media (min-width: ${breakpoint}) {
    & > * {
      padding: 1.2rem 0.7rem;
    }
  }
`;

// List of nav items
const mainMenuItems = [
  {
    title: "Marketplace",
    url: "#",
    isCommunity: false,
  },
  {
    title: "🔥 Drops",
    url: "#",
    isCommunity: false,
  },
  {
    title: "Activity",
    url: "#",
    isCommunity: false,
  },
];

export default function MainMenu() {
  return (
    <StyledMenu>
      {mainMenuItems.map((item) => (
        <SpecialMenuItem key={item.title}>
          <a href={item.url}>{item.title}</a>
        </SpecialMenuItem>
      ))}
    </StyledMenu>
  );
}
