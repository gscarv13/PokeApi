import React from "react";
import Trade from "./components/Trade.jsx";
import LineChart from "./components/LineChart.jsx";
import Transactions from "./components/Transactions.jsx";
import Wallet from "./components/Wallet.jsx";
import { finishBuyTrade, finishSellTrade } from "./utils/tradeHelper.js";
import useDashboard from "./hooks/useDashboard.jsx";

function App() {
  const {
    pokemons,
    pokeBalance,
    usdBalance,
    tokensBalance,
    getDashboard,
    transactions,
    BTCInfo,
  } = useDashboard();

  return (
    <div className="container">
      <div className="balance-container">
        {usdBalance && BTCInfo && (
          <Wallet
            tokensBalance={tokensBalance}
            usdBalance={usdBalance}
            BTCPriceChange={BTCInfo.priceChange1d}
            BTCPrice={BTCInfo.price}
          />
        )}
        <div>
          {transactions && <Transactions transactions={transactions} />}
        </div>
      </div>

      <div>
        <LineChart />
      </div>

      <div>
        <h2 className="trade-section-title"> Trade </h2>
        <div className="trade-grid">
          {pokeBalance && BTCInfo && (
            <Trade
              operation="Sell"
              tokens={pokeBalance}
              refreshDashboard={getDashboard}
              handleSellTrade={finishSellTrade}
              btcValue={BTCInfo.price}
            />
          )}
          {pokemons && BTCInfo && (
            <Trade
              operation="Buy"
              tokens={pokemons}
              refreshDashboard={getDashboard}
              handleBuyTrade={finishBuyTrade}
              btcValue={BTCInfo.price}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
