const { GameLogic } = require("./modules/GameLogic");
const { inputIntegerFromUser, inputStringFromUser } = require("./common/GameFunction");

// Input data from user
const inputNewPlayerDetails = async () => {
  const name = await inputStringFromUser("Enter the player's name: ");
  const health = await inputIntegerFromUser(`Enter ${name}'s health: `);
  const strength = await inputIntegerFromUser(`Enter ${name}'s strength: `);
  const attack = await inputIntegerFromUser(`Enter ${name}'s attack: `);

  return { name, health, attack, strength };
};

