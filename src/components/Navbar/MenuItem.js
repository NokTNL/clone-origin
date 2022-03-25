import styled from "styled-components";

const MenuItem = styled.li`
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e1e1e1;
  }

  & > * {
    padding: 1rem 0;
    flex: 1;
  }

  & > a {
    display: inline-block;
  }
`;

export default MenuItem;
