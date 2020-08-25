import React, { Component } from "react";

// Import Front/Back cards
import CardFront from "./CardFront";
import CardBack from "./CardBack";

class Card extends Component {
  render() {
    const { card, handleClick, id, isFlipped } = this.props;

    return (
      <div className="card-container">
        {isFlipped ? (
          <CardFront card={card} id={id} />
        ) : (
          <CardBack handleClick={handleClick} id={id} />
        )}
      </div>
    );
  }
}

export default Card;
