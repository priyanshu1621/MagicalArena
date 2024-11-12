const { rollDice } = require("../utils/GameFunction");
const { Player } = require("./Player");

class GameLogic {
    constructor() {
        this.total_players = 0; // set initial total players as 0
        this.Players = new Map();
        console.log("Welcome to the arena!!!\n");
    }

    isPresent(id) {
        return this.Players.has(id);
    }

    getPlayerCount() {
        return this.Players.size;
    }

    // create player
    addPlayer(name, health, strength, attack) {
        if (health <= 0) {
            console.log("Health should be a positive integer.");
            return -1;
        }
        if (strength <= 0) {
            console.log("strength should be a positive integer.");
            return -1;
        }
        if (attack <= 0) {
            console.log("attack should be a positive integer.");
            return -1;
        }

        const id = this.total_players;
        const newPlayer = new Player(id, name, health, strength, attack);
        this.Players.set(id, newPlayer);
        this.total_players += 1;

        return id;
    }

    // delete player who lost the game
  deletePlayer(id) {
    if (this.Players.has(id)) {
      const player = this.Players.get(id);
      console.log(`Player - ${player?.name} Lost the Game\n`);
      this.Players.delete(id);
    } else {
      console.log(`No player with id = ${id} exists.\n`);
    }
  }

}