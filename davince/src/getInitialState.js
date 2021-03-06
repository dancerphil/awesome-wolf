function getInitialDeck() {
  const deck = [];
  deck.push({
    background: 'white',
    color: 'black',
    rank: '-',
    isOpen: false
  });
  deck.push({
    background: 'black',
    color: 'white',
    rank: '-',
    isOpen: false
  });
  for (let i = 0; i < 12; i++) {
    deck.push({
      background: 'white',
      color: 'black',
      rank: i,
      isOpen: false
    });
    deck.push({
      background: 'black',
      color: 'white',
      rank: i,
      isOpen: false
    });
  }
  return deck;
}

function shuffle(deck) {
  deck.sort(() => Math.random() - 0.5);
}

function getInitialState(roomId) {
  const deck = getInitialDeck();
  shuffle(deck);
  const state = {
    roomId,
    whoAmI: null,
    playerInfo: [{},{},{},{}],
    player: [[],[],[],[]],
    deck,
    turn: {
      player: 0,
      step: 'login'
    },
    error: ''
  };
  return state;
}
export default getInitialState;