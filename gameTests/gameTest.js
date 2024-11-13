const { GameLogic } = require("../modules/GameLogic");

describe("GameLogic class", () => {
  
    // test cases for adding player
    describe("addPlayer method", () => {
        let game;

        beforeEach(() => {
            game = new GameLogic();
        });

        // make sure that health have positive integer value
        test("A player's health can't be negative or zero.", () => {
            let id = game.addPlayer("A", -2, 200, 100);
            expect(id).toEqual(-1);

            id = game.addPlayer("A", 0, 200, 100);
            expect(id).toEqual(-1);
        });

        // make sure that strength have positive integer value
        test("A player's strength can't be negative or zero.", () => {
            let id = game.addPlayer("A", 2, -200, 100);
            expect(id).toEqual(-1);

            id = game.addPlayer("A", 10, 0, 100);
            expect(id).toEqual(-1);
        });

        // make sure that attack have positive integer value
        test("A player's attack can't be negative or zero.", () => {
            let id = game.addPlayer("A", 2, 200, -100);
            expect(id).toEqual(-1);

            id = game.addPlayer("A", 10, 120, 0);
            expect(id).toEqual(-1);
        });

        // selected user(selected using id) should be present in game
        test("A newly added player to be present in the GameLogic.", () => {
            const id = game.addPlayer("A", 100, 200, 100);
            expect(game.isPresent(id)).toEqual(true);
        });
  
        // player count increment
        test("Player count should increase after addition of a new player.", () => {
            const oldPlayerCount = game.getPlayerCount();
            game.addPlayer("A", 100, 200, 100);
            const newPlayerCount = game.getPlayerCount();
  
            expect(newPlayerCount).toEqual(oldPlayerCount + 1);
        });
      });
    
      // test cases for deleting player
      describe("deletePlayer method", () => {
        let game;
    
        beforeEach(() => {
          game = new GameLogic();
        });
    
        test("The deleted player should not be present in the GameLogic.", () => {
          const id = game.addPlayer("A", 100, 200, 100);
          game.deletePlayer(id);
          expect(game.isPresent(id)).toEqual(false);
        });
    
        // if player lost the game then  player count should be decreased
        test("Player count should decrease after deletion of a player.", () => {
          const id = game.addPlayer("A", 100, 200, 100);
          const oldPlayerCount = game.getPlayerCount();
    
          game.deletePlayer(id);
          const newPlayerCount = game.getPlayerCount();
    
          expect(newPlayerCount).toEqual(oldPlayerCount - 1);
        });
      });
    
      // test cases for battle
      describe("battle method", () => {
        let game;
    
        beforeEach(() => {
          game = new GameLogic();
        });
    
        // if no player is selected
        test("Battle with empty GameLogic.", () => {
          expect(game.battle(0, 1)).toEqual({});
        });
    
        // if both player id is same
        test("Players have the same id.", () => {
          game.addPlayer("A", 100, 200, 100);
          game.addPlayer("B", 200, 300, 100);
    
          expect(game.battle(0, 0)).toEqual({});
        });
    
        // if id does not exist
        test("One of the Player's id does not exist.", () => {
          game.addPlayer("A", 100, 200, 100);
          game.addPlayer("B", 200, 300, 100);
    
          expect(game.battle(0, 10)).toEqual({});
        });
    
        test("Normal battle", () => {
          game.addPlayer("A", 100, 200, 100);
          game.addPlayer("B", 200, 300, 100);
    
          const possibleOutcomes = [
            { winner: 0, loser: 1 },
            { winner: 1, loser: 0 },
          ];
    
          const res = game.battle(0, 1);
          expect(possibleOutcomes).toContainEqual(res);
    
          const { winner, loser } = res;
    
          // the winner should be present in the GameLogic
          expect(game.isPresent(winner)).toBe(true);
          // the loser should not be present in the GameLogic, must be deleted
          expect(game.isPresent(loser)).toBe(false);
        });
      });
    });
    