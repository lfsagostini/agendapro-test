// create a 4x4 matrix
// S - start
// C - Candy
// G - Ghost
const start = 'Start';
const candy = 'Candy';
const ghost = 'Ghost';
const enigm = '?';

const mansion = [
  [start, enigm, enigm, enigm],
  [enigm, enigm, ghost, enigm],
  [enigm, enigm, enigm, ghost],
  [enigm, enigm, candy, enigm],
];

// list of enigms
const listEnigms = [
  {
    question: 'What is the dog sound?',
    response: 'Woof',
  },
  {
    question: 'What is the cat sound?',
    response: 'Meow',
  },
  {
    question: 'What is the cow sound?',
    response: 'Moo',
  },
];

const startGame = () => {
  console.info('Starting the game...');
  console.table(mansion);

  const playerTarget = {
    x: 0,
    y: 0,
  };
  let candyFound = false;

  while (!candyFound) {}
};

startGame();
