import styled from "styled-components";
import MenuItem from "./MenuItem";

const StyledMenu = styled.ul`
  @media (min-width: ${({ breakpoint }) => breakpoint}) {
    display: flex;
  }
`;

const SpecialMenuItem = styled(MenuItem)`
  @media (min-width: ${({ breakpoint }) => breakpoint}) {
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

export default function MainMenu({ breakpoint }) {
  return (
    <StyledMenu breakpoint={breakpoint}>
      {mainMenuItems.map((item) => (
        <SpecialMenuItem key={item.title} breakpoint={breakpoint}>
          <a href={item.url}>{item.title}</a>
        </SpecialMenuItem>
      ))}
    </StyledMenu>
  );
}
