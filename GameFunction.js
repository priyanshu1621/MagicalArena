const readline = require("readline");

// dice roll function
function rollDice() {
  let min = 1,
    max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// take string as input from user
function inputStringFromUser(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    rl.question(prompt, (inputString) => {
      rl.close();
      resolve(inputString);
    });
  });
}

// take integer as input from user
function inputIntegerFromUser(promptMessage) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(promptMessage, (inputString) => {
      rl.close();
      const userInput = parseInt(inputString.trim(), 10);
      if (!isNaN(userInput)) {
        resolve(userInput);
      } else {
        console.log("Invalid input. Please enter a valid integer!!");
        resolve(inputIntegerFromUser(promptMessage));
      }
    });
  });
}

module.exports = { rollDice, inputStringFromUser, inputIntegerFromUser };
