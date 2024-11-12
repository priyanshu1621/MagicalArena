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


// Main code starter
const mainExecuter = async () => {
    const game = new GameLogic();
    while (true) {
      game.displayPlayers();
      console.log(
        "Options: \n\t1> Add new player\n\t2> Start Battle\n\t3> End Game\n"
      );
      const option = await inputIntegerFromUser("Enter your choice (integer): ");
      if (option === 1) {
        const { name, health, attack, strength } = await inputNewPlayerDetails();
        game.addPlayer(name, health, strength, attack);
      } else if (option === 2) {
        if (game.getPlayerCount() < 2) {
          console.log(
            "There should be at least two players in the GameLogic.\nPlease add more players.\n"
          );
        } else {
          const id_first = await inputIntegerFromUser(
            "Enter the first player's id: "
          );
          const id_second = await inputIntegerFromUser(
            "Enter the second player's id: "
          );
          game.battle(id_first, id_second);
        }
      } else {
        console.log("Good Bye...\n");
        break;
      }
  
      console.log(
        "\n____________________________________________________________________________________________________\n\n"
      );
    }
  };
  
  mainExecuter();
  