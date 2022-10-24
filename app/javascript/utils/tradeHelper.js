import { TRADE_BUY, TRADE_SELL } from "./constants.js";
import { httpPostTrade } from "./requests.js";
import { tokensToUsd } from "./moneyConversion.js";

export const finishBuyTrade = async (
  totalTokensSum,
  selectedTokens,
  BTCPrice,
  callback
) => {
  const filteredTokens = selectedTokens.reduce((filtered, token) => {
    if (token.amount !== 0) {
      filtered.push({
        id: token.id,
        amount: token.amount,
        base_experience: token.base_experience,
      });

      return filtered;
    }

    return filtered;
  }, []);

  const body = {
    total_tokens: totalTokensSum,
    total_usd: tokensToUsd(totalTokensSum, BTCPrice),
    pokemons: filteredTokens,
  };

  await httpPostTrade(body, TRADE_BUY);
  callback();
};

export const finishSellTrade = async (
  currentTokens,
  selectedTokens,
  BTCPrice,
  callback
) => {
  let totalTokensSold = 0;
  const filteredTokens = selectedTokens.reduce((filtered, token) => {
    const currentAmount = currentTokens.find(
      (prevToken) => prevToken.id === token.id
    );

    if (token.amount < currentAmount.amount) {
      totalTokensSold +=
        (currentAmount.amount - token.amount) * token.base_experience;

      filtered.push({
        id: token.pokemon_id,
        previous_amount: currentAmount.amount,
        amount: token.amount,
        base_experience: token.base_experience,
      });

      return filtered;
    }

    return filtered;
  }, []);

  const body = {
    total_tokens: totalTokensSold,
    total_usd: tokensToUsd(totalTokensSold, BTCPrice),
    pokemons: filteredTokens,
  };

  await httpPostTrade(body, TRADE_SELL);
  callback();
};
