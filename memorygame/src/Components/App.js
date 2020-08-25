import React, { Component } from "react";
import Card from "./Card";

const initialCards = [
  {
    image:
      "https://icon-library.com/images/development-icon/development-icon-28.jpg",
  },
  {
    image:
      "https://cdn4.iconfinder.com/data/icons/circle-web-and-programming/512/Website_and_programming_21-512.png",
  },
  {
    image:
      "https://images.vexels.com/media/users/3/166383/isolated/preview/6024bc5746d7436c727825dc4fc23c22-html-programming-language-icon-by-vexels.png",
  },
  {
    image:
      "https://banner2.cleanpng.com/20180810/biz/kisspng-javascript-scalable-vector-graphics-logo-encapsula-javascript-le-ekran-grnts-almak-alpere-5b6dbeb48e4583.2854840415339189005828.jpg",
  },
  {
    image:
      "https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png",
  },
  {
    image:
      "https://cdn3.iconfinder.com/data/icons/social-media-logos-flat-colorful-1/2048/5351_-_CSS3-512.png",
  },
];

const generateCards = () => {
  // Make a Copy of Cards array
  const duplicateArray = [...initialCards];
  // Join both initialCards array and the copy of initial array (duplicate)
  // Randomize there position in the array so the cards are never on the same place
  return initialCards.concat(duplicateArray).sort(() => Math.random() - 0.5);
};

class App extends Component {
  state = {
    // Call shuffled/randomized cards
    cards: generateCards(),
    // Created another array elements which represents
    // if the card witihn the array is flipped or not (true or false)
    isFlipped: Array(generateCards().length).fill(false),
    // Previous selected card so we can compare
    previousSelectedCard: -1,
    // Previous card id so we can compare index
    prevCardId: -1,
    // Click count so we can see if we clicked two cards
    clickCount: 1,
  };

  handleClick = (e) => {
    e.preventDefault();

    // Capture the card we click on
    const cardId = e.target.id;
    // returns a section of the array (this array is just filled with false initially)
    const cardsFlipped = this.state.isFlipped.slice();

    this.setState({
      // Updated the state by capturing the previous selected card based on the cardID (index/position)
      previousSelectedCard: this.state.cards[cardId],
      // Store index of card in state
      prevCardId: cardId,
    });

    // Check if our selected card is flipped (if the card is not flipped it should be set to false)
    if (cardsFlipped[cardId] === false) {
      // if the card is not flipped, we set it to the oppisite of
      // its current value (which is true)
      cardsFlipped[cardId] = !cardsFlipped[cardId];

      // Update our state after we change our flip card to true
      this.setState(() => ({
        isFlipped: cardsFlipped,
        // Increment click count
        clickCount: this.state.clickCount + 1,
      }));
    }

    // If a user clicked another card
    if (this.state.clickCount === 2) {
      // Reset the click count
      this.setState({ clickCount: 1 });

      // Get the previous selected card id (index)
      const prevCardId = this.state.prevCardId;
      // Capture the second selected card
      const newCard = this.state.cards[cardId];
      // Capture previous selected card
      const previousSelectedCard = this.state.previousSelectedCard;

      // Check if previous card and second card match:
      if (previousSelectedCard === newCard) {
        alert("Great work you matched a pair keep going");
      } else {
        // Get the array with the status of all cards (false)
        const flipBack = this.state.isFlipped;

        // If the cards don't match, flipp them back
        flipBack[cardId] = false;
        flipBack[prevCardId] = false;

        // Update the state with newly inocrrect cards flipped back
        setTimeout(() => {
          this.setState({
            isFlipped: flipBack,
          });
        }, 1000);
      }
    }
  };

  isGameOver = () => {
    return this.state.isFlipped.every(
      (element, index, array) => element !== false
    );
  };

  render() {
    return (
      <div>
        <h1 className="Header">Try Your Luck And Match The Card Pairs</h1>
        <div style={boardStyles}>
          {this.state.cards.map((card, index) => (
            <Card
              key={index}
              id={index}
              card={card}
              isFlipped={this.state.isFlipped[index]}
              handleClick={this.handleClick}
            />
          ))}

          {this.isGameOver() && (
            <button className="Btn" onClick={() => window.location.reload()}>
              Well Done Play Again
            </button>
          )}
          {/** Visualise state changing whenever a card is clicked */}
        </div>
      </div>
    );
  }
}

const boardStyles = {
  display: "flex",
  flexWrap: "wrap",
  width: "70%",
  margin: "0 auto",
};

export default App;
