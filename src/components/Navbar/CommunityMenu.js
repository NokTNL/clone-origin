import { useState } from "react";
import styled from "styled-components";

import MenuItem from "./MenuItem";

const Container = styled.div`
  position: relative;
`;

const Title = styled.span`
  display: none;

  @media (min-width: ${({ breakpoint }) => breakpoint}) {
    display: block;
    padding: 1.2rem 0.7rem;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      background-color: #e1e1e1;
    }
  }
`;

const DownIcon = styled.i`
  margin-left: 0.2rem;
`;

const Menu = styled.ul`
  @media (min-width: ${({ breakpoint }) => breakpoint}) {
    /* position: absolute needs a positioned parent */
    position: absolute;
    right: 0;
    width: 15rem;
    display: ${({ isDisplaying }) => (isDisplaying ? "block" : "none")};
    border: 0.05rem solid black;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const SpecialMenuItem = styled(MenuItem)`
  @media (min-width: ${({ breakpoint }) => breakpoint}) {
    & > * {
      padding: 1rem 0.5rem;
    }
  }
`;

// List of community menu items
const commMenuItems = [
  {
    title: "Collections",
    url: "#",
    isCommunity: true,
  },
  {
    title: "Journal",
    url: "#",
    isCommunity: true,
  },
  {
    title: "Search users",
    url: "#",
    isCommunity: true,
  },
  {
    title: "Trending",
    url: "#",
    isCommunity: true,
  },
  {
    title: "Hall of fame",
    url: "#",
    isCommunity: true,
  },
];

export default function CommunityMenu({ breakpoint }) {
  const [isDisplayingItems, setIsDisplayingItems] = useState(false);

  const handleToggleItems = () => {
    setIsDisplayingItems((prev) => !prev);
  };

  return (
    <Container>
      <Title breakpoint={breakpoint} onClick={handleToggleItems}>
        Community<DownIcon className="bi bi-chevron-down"></DownIcon>
      </Title>
      <Menu isDisplaying={isDisplayingItems} breakpoint={breakpoint}>
        {commMenuItems.map((item) => (
          <SpecialMenuItem key={item.title} breakpoint={breakpoint}>
            <a href={item.url}>{item.title}</a>
          </SpecialMenuItem>
        ))}
      </Menu>
    </Container>
  );
}
