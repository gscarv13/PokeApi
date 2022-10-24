export const tokensToUsd = (tokens, btc_in_usd) => {
  return ((tokens * btc_in_usd.toFixed(2)) / 100000000).toFixed(2);
};
