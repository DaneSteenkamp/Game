import React from "react";

const CardBack = (props) => {
  return (
    <div className="tileBack" onClick={props.handleClick} id={props.id}></div>
  );
};
export default CardBack;
