import React from "react";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const Transactions = ({ transactions }) => {
  return (
    <div>
      <h2>Latest Transactions</h2>
      <div className="trades-history-container">
        <table>
          <thead>
            <tr>
              <td>Operation</td>
              <td>Amount</td>
              <td>Date</td>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={`tt-${t.id}`}>
                <td className={`operation-${t.operation}`}>{t.operation}</td>
                <td>
                  {t.operation === "buy" ? "+" : "-"} {t.amount} PokeCoin
                </td>
                <td>{formatDate(t.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
