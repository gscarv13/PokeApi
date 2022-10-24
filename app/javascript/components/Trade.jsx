import React, { useState, useEffect } from "react";
import TradeItem from "./TradeItem.jsx";
import { tokensToUsd } from "../utils/moneyConversion.js";

const Trade = ({
  tokens,
  refreshDashboard,
  operation,
  handleBuyTrade = null,
  handleSellTrade = null,
  btcValue,
}) => {
  const updateTradeItems = () => {
    return tokens.map((token) => ({
      ...token,
      amount: token.amount || 0,
      max: token.amount || null,
    }));
  };

  const [tradeItems, setTradeItems] = useState(updateTradeItems());

  const total = tradeItems.reduce((sum, token) => {
    const exp = Number(token.base_experience);
    const amount = Number(token.amount) || 0;

    return (sum += exp * amount);
  }, 0);

  const onAdd = (token, max) => {
    const currentToken = tradeItems.find(
      (currentToken) => currentToken.id === token.id
    );
    if (!currentToken.amount) {
      currentToken.amount = 0;
    }

    if (!max) {
      currentToken.amount += 100;
      setTradeItems((prev) =>
        prev.map((prevToken) =>
          prevToken.id === currentToken.id ? currentToken : prevToken
        )
      );
    } else {
      currentToken.amount + 100 <= max
        ? (currentToken.amount += 100)
        : currentToken.amount;
      setTradeItems((prev) =>
        prev.map((prevToken) =>
          prevToken.id === currentToken.id ? currentToken : prevToken
        )
      );
    }
  };

  const onRemove = (token) => {
    const currentToken = tradeItems.find(
      (currentToken) => currentToken.id === token.id
    );
    if (currentToken.amount === 0) return;

    setTradeItems((prev) =>
      prev.map((prevToken) =>
        prevToken.id === currentToken.id
          ? { ...prevToken, amount: (prevToken.amount -= 100) }
          : prevToken
      )
    );
  };

  useEffect(() => {
    setTradeItems(updateTradeItems());
  }, [tokens]);

  return (
    <div className={`trade-container ${operation.toLowerCase()}-container`}>
      <div>
        <h2>{operation}</h2>
        <div className="total-trade">
          <div>
            <div className="total-title">Total</div>
            <div className="total-tokens">{total} PokeCoins</div>
          </div>
          <div className="total-amount">${tokensToUsd(total, btcValue)}</div>
        </div>
        <button
          className={`btn btn-${operation.toLowerCase()}`}
          onClick={
            operation === "Buy"
              ? () =>
                  handleBuyTrade(total, tradeItems, btcValue, refreshDashboard)
              : () =>
                  handleSellTrade(
                    tokens,
                    tradeItems,
                    btcValue,
                    refreshDashboard
                  )
          }
        >
          Close Trade
        </button>
      </div>
      <div className="list-container">
        {tradeItems.map((token) => (
          <TradeItem
            key={`${operation}${token.id}`}
            id={token.id}
            image={token.image}
            name={token.name}
            amount={token.amount}
            baseExp={token.base_experience}
            usdAmount={token.usdAmount}
            onAdd={() => onAdd(token, token.max)}
            onRemove={() => onRemove(token)}
          />
        ))}
      </div>
    </div>
  );
};

export default Trade;
