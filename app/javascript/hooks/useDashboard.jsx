import { useState, useEffect } from "react";

import { httpGetDashboard, httpGetBTC } from "../utils/requests";

const useDashboard = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokeBalance, setPokeBalance] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null);
  const [tokensBalance, setTokensBalance] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [BTCInfo, setBTCInfo] = useState(null);

  const getDashboard = async () => {
    const dashboardData = await httpGetDashboard();

    setPokemons(() => dashboardData.pokemons);
    setPokeBalance(() => dashboardData.pokemon_balance);
    setTransactions(() => dashboardData.transactions);
    setUsdBalance(() => dashboardData.wallet.usd_balance);
    setTokensBalance(() => dashboardData.wallet.tokens_balance);
  };

  const getBTC = async () => {
    const BTCData = await httpGetBTC();
    
    setBTCInfo(BTCData.coin);
  };

  useEffect(() => {
    getDashboard();
    getBTC();
  }, []);

  return {
    pokemons,
    pokeBalance,
    transactions,
    usdBalance,
    tokensBalance,
    getDashboard,
    BTCInfo,
  };
};

export default useDashboard;
