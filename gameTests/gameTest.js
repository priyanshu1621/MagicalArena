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

    }