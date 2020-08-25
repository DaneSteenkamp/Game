import React from "react";

const CardFront = (props) => {
  const { card } = props;

  return (
    <div className="tileFront">
      <img className="iconImage" src={card.image} alt={card.id} height="300" />
    </div>
  );
};

export default CardFront;
