const { rollDice } = require("../common/GameFunction");
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
            console.log(`Player - ${player?.name} Lost the Game . Better Luck Next Time\n`);
            this.Players.delete(id);
        } else {
            console.log(`No player with id = ${id} exists.\n`);
        }
    }

    // Display player
    displayPlayers() {
        console.log("|\tID\t |\tNAME\t |\tHEALTH\t |\tSTRENGTH\t |\tATTACK\t|");
        for (const [id, player] of this.Players) {
            const { name, health, strength, attack } = player;
            console.log(
                `|\t${id}\t|\t${name}\t|\t${health}\t|\t     ${strength}     \t|\t${attack}\t|`
            );
        }
        console.log("\n");
    }


    // Battle logic 
    battle(id_first, id_second) {
        if (id_first === id_second) {
            console.log("Id's can not be the same for both the players.\n");
            return {};
        } else if (!this.Players.has(id_first)) {
            console.log(`No player with id = ${id_first} exists.\n`);
            return {};
        } else if (!this.Players.has(id_second)) {
            console.log(`No player with id = ${id_second} exists.\n`);
            return {};
        } else {
            let attacker = this.Players.get(id_first);
            let defender = this.Players.get(id_second);
            console.log(
                `\n_______________________________Player - ${attacker.name} V/S Player - ${defender.name}_______________________________\n`
            );

            // attacker will be the one whose health is less
            if (defender.health < attacker.health) {
                [attacker, defender] = [defender, attacker];
            }
            let round = 1;
            while (defender.health > 0) {
                let attackDice = rollDice();
                let defenseDice = rollDice();
                console.log(
                    `\n_________________________Round - ${round} Start_______________________\n`
                );
                const attacking_power = attacker.attack * attackDice;
                const defending_power = defender.strength * defenseDice;

                console.log("Attack Dice Outcome: ", attackDice);
                console.log(
                    `${attacker?.name} hits ${defender?.name} with power = ${attacking_power}\n`
                );

                console.log("Defense Dice Outcome: ", defenseDice);
                console.log(
                    `${defender?.name} defends with power = ${defending_power}\n`
                );

                // if attacking power if greater than defending power only then update the health of defender
                if (attacking_power > defending_power) {
                    defender.health -= attacking_power - defending_power;
                    // make sure that health never goes negative
                    defender.health = Math.max(0, defender.health);
                }

                console.log(`${defender?.name}'s health: ${defender.health}`);
                console.log(
                    `\n_________________________Round - ${round} End_________________________\n`
                );
                round++;

                // if both defending player have health greater than 0 then switch players
                if (defender.health > 0) {
                    [attacker, defender] = [defender, attacker];
                }
            }

            const res = { winner: attacker.id, loser: defender.id };
            console.log(`Player - ${attacker?.name} has Won the Battle!!!\n`);
            this.deletePlayer(defender.id);

            return res;
        }
    }
}

module.exports = { GameLogic };
