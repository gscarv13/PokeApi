import React from "react";

const TradeItem = ({
  image,
  name,
  amount,
  baseExp,
  usdAmount,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="item">
      <div className="image">
        <img src={image} alt="" />
      </div>

      <div className="description">
        <span>{name}</span>
        <span>{baseExp} PokeCoins</span>
        <span>{usdAmount}</span>
      </div>

      <div className="amount-control">
        <button className="plus-btn" type="button" name="button" onClick={onRemove}>
          -
        </button>
        <span className="">{amount}</span>
        <button className="minus-btn" type="button" name="button" onClick={onAdd}>
          +
        </button>
      </div>

      <div className="total-price">{amount * baseExp} PokeCoins</div>
    </div>
  );
};

export default TradeItem;
