import React from "react";
import { tokensToUsd } from "../utils/moneyConversion.js";

const Wallet = ({ tokensBalance, usdBalance, BTCPriceChange, BTCPrice }) => {
  return (
    <div className="wallet">
      <h2> Balance </h2>
      <p className="wallet-balance">
        {tokensBalance > 0 && (
          <span className="wallet-balance-detail">
            {BTCPriceChange.toString()[0] !== "-"
              ? `+${BTCPriceChange}`
              : BTCPriceChange}
            % last 24h
          </span>
        )}
        {tokensBalance} PokeCoins
        <span className="wallet-balance-detail">
          $ {tokensToUsd(tokensBalance, BTCPrice)} USD
        </span>
      </p>
      <p className="wallet-deposit">$ {usdBalance} USD deposit</p>
    </div>
  );
};

export default Wallet;
