import styled from "styled-components";

const Button = styled.button.attrs(({ color }) => {
  const baseColor = (function () {
    switch (color) {
      case "primary":
        return "#5165ff";
      case "white":
        return "white";
      default:
        return "black";
    }
  })();
  const invertColor = (function () {
    switch (color) {
      case "primary":
        return "white";
      case "white":
        return "black";
      default:
        return "white";
    }
  })();

  return { baseColor, invertColor };
})`
  border: 1px solid ${({ baseColor }) => baseColor};
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  background-color: transparent;
  color: ${({ baseColor }) => baseColor};

  &:hover {
    background-color: ${({ baseColor }) => baseColor};
    color: ${({ invertColor }) => invertColor};
  }
`;

export default Button;
