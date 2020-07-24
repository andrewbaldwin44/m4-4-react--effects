import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";

import Item from './Item';

import useInterval from '../hooks/use-interval.hook';
import useKeydown from '../hooks/useKeydown.hook';
import useDocumentTitle from '../hooks/useDocumentTitle.hook';

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const findItemValue = (id) => {
  return items.find(item => item.id === id);
}

const calculateCookiesPerTick = purchasedItems => {
  const cursorCookiesValue = findItemValue('cursor').value;
  const grandmaCookiesValue = findItemValue('grandma').value;
  const farmCookiesValue = findItemValue('farm').value;

  const cursorCookies = purchasedItems.cursor * cursorCookiesValue;
  const grandmaCookies = purchasedItems.grandma * grandmaCookiesValue;
  const farmCookies = purchasedItems.farm * farmCookiesValue;

  return cursorCookies + grandmaCookies + farmCookies;
};

const Game = () => {
  const [cookieCount, setCookieCount] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    }
  );

  useInterval(() => {
    const generatedCookies = calculateCookiesPerTick(purchasedItems);

    setCookieCount(cookieCount + generatedCookies)
  }, 1000);

  useKeydown(() => setCookieCount(cookieCount + 1), 'Space');
  useDocumentTitle(`${cookieCount} cookies - Cookie Clicker`, `Cookie Clicker`);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookieCount} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setCookieCount(cookieCount + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              cookieCount={cookieCount}
              setCookieCount={setCookieCount}
              purchasedItems={purchasedItems}
              setPurchasedItems={setPurchasedItems}
            />
          )
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
  margin-bottom: 10px;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
