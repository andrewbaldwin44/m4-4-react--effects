import React from "react";
import styled from "styled-components";

const ItemContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 420px;
  height: 50px;
  border: none;
  color: white;
  text-align: left;
  background-color: transparent;
  border-bottom: 1px solid #424242;
  cursor: pointer;
  z-index: 1000;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: none;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const Info = styled.span`
  font-size: 16px;
  color: lightgray;
`;

const Purchased = styled.span`
  font-size: 26px;
  margin-right: 10px;
  pointer-events: none;
`;

function Item({ id, name, cost, value, cookieCount, setCookieCount,
                purchasedItems, setPurchasedItems }) {

  const amountPurchased = purchasedItems[id];
  const focusItem = React.createRef();

  const handleClick = (id) => {
    if (cookieCount >= cost) {
      setPurchasedItems({
        ...purchasedItems,
        [id]: purchasedItems[id] + 1
      });

      setCookieCount(cookieCount - cost);
    }
  }

  React.useEffect(() => {
    if (id === 'cursor') {
      focusItem.current.focus();
    }
  });

  return (
    <ItemContainer
      onClick={() => handleClick(id)}
      ref={focusItem}
    >
      <ItemInfo>
        <Name>{name}</Name>
        <Info>
          Cost: {cost} cookie{cost > 1 ? 's' : ''}.
          Produces {value} cookie{value > 1 ? 's' : ''}/second.
        </Info>
      </ItemInfo>
      <Purchased>{amountPurchased}</Purchased>
    </ItemContainer>
  )
}

export default Item;
