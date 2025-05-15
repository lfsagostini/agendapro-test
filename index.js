// create a 4x4 matrix
// S - start
// C - Candy
// G - Ghost
// ? - enigm
// P - player
const start = 'Start';
const candy = 'Candy';
const ghost = 'Ghost';
const enigm = '?';
const player = 'Player';

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

const rlInterface = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question) => {
  return new Promise((resolve) => {
    rlInterface.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const handleEnigm = async (enigm) => {
  const answer = await prompt(`${enigm.question} `);
  if (answer.toLowerCase() === enigm.response.toLowerCase()) {
    console.info('Good job!');
    return true;
  } else {
    console.info('Wrong answer!');

    return false;
  }
};

const startGame = async () => {
  console.info('Starting the game...');

  const playerTarget = {
    x: 0,
    y: 0,
  };
  let candyFound = false;

  while (!candyFound) {
    console.table(mansion);
    // Get the player's move
    // Using WASD
    // W = up, A = left, S = down, D = right
    const move = await prompt(
      'Enter your move (W - up, S - down, A- left, D- right): '
    );

    console.info(`You moved ${move}`);
    const lastPosition = {
      x: playerTarget.x,
      y: playerTarget.y,
    };
    // Update the player's position
    switch (move.toUpperCase()) {
      case 'W':
        if (playerTarget.x > 0) playerTarget.x--;
        break;
      case 'S':
        if (playerTarget.x < mansion.length - 1) playerTarget.x++;
        break;
      case 'A':
        if (playerTarget.y > 0) playerTarget.y--;
        break;
      case 'D':
        if (playerTarget.y < mansion[0].length - 1) playerTarget.y++;
        break;
      default:
        console.info('Invalid move');
        continue;
    }

    // Check player position slot
    const currentSlot = mansion[playerTarget.x][playerTarget.y];

    if (currentSlot === candy) {
      console.info('You found the candy! You win!');
      candyFound = true;
    } else if (currentSlot === ghost) {
      console.info('You found the ghost! You need to answer two enigms!');
      // Ask two enigms
      const enigm1 = listEnigms[Math.floor(Math.random() * listEnigms.length)];
      const answer1 = await handleEnigm(enigm1);
      if (!answer1) {
        playerTarget.x = lastPosition.x;
        playerTarget.y = lastPosition.y;
        continue;
      }
      const enigm2 = listEnigms[Math.floor(Math.random() * listEnigms.length)];
      const answer2 = await handleEnigm(enigm2, lastPosition);
      if (!answer2) {
        playerTarget.x = lastPosition.x;
        playerTarget.y = lastPosition.y;
        continue;
      }
    } else if (currentSlot === enigm) {
      // Ask an enigm
      const enigm = listEnigms[Math.floor(Math.random() * listEnigms.length)];
      const answer = await handleEnigm(enigm, lastPosition);
      if (!answer) {
        playerTarget.x = lastPosition.x;
        playerTarget.y = lastPosition.y;
        continue;
      }
    }
    mansion[playerTarget.x][playerTarget.y] = player;
    // if last position is not the same as current position and last position is not the start
    // set last position to enigm
    if (
      (lastPosition.x !== playerTarget.x ||
        lastPosition.y !== playerTarget.y) &&
      mansion[lastPosition.x][lastPosition.y] !== start
    ) {
      mansion[lastPosition.x][lastPosition.y] = enigm;
    }
  }
};

startGame();
