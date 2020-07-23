import React from "react";
import styled from "styled-components";

const ItemContainer = styled.button`
  width: 420px;
  height: 50px;
  border: none;
  color: white;
  text-align: left;
  background-color: transparent;
  border-bottom: 1px solid #424242;
  cursor: pointer;
  z-index: 100;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const Info = styled.span`
  font-size: 16px;
  color: lightgray;
`

function Item({ name, cost, value, purchasedItems }) {
  const [count, setCount] = React.useState(0);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target)
  }

  return (
    <ItemContainer
      onClick={handleClick}
      value={name}
    >
      <ItemInfo>
        <Name>{name}</Name>
        <Info>
          Cost: {cost} cookie{cost > 1 ? 's' : ''}.
          Produces {value} cookie{value > 1 ? 's' : ''}.second.
        </Info>
      </ItemInfo>
    </ItemContainer>
  )
}

export default Item;
