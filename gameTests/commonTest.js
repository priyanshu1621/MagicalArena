const { rollDice } = require("../utils/GameFunction");

describe("rollDice function", () => {
  
  // dice output should be in range of 1 - 6
  test("returns a number between 1 and 6", () => {
    const result = rollDice();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  // make sure that dice roll output should be an integer
  test("returns an integer", () => {
    const result = rollDice();
    expect(Number.isInteger(result)).toBe(true);
  });
});
