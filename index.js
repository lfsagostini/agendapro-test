// create a 4x4 matrix
// S - start
// C - Candy
// G - Ghost
const start = 'S';
const candy = 'C';
const ghost = 'G';

const mansion = [
  [start, 0, 0, 0],
  [0, 0, ghost, 0],
  [0, 0, 0, ghost],
  [0, 0, candy, 0],
];

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
