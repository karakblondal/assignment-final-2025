import { describe, it, expect } from 'vitest';
import { Sign } from "../utils/constants";
import { calculateWinner, getWhosTurnItIs, getPlayerNameFromSign } from "../utils/gameUtils";
import { Game } from "../lib/gameStore";

describe("gameUtils", () => {
  describe("calculateWinner", () => {
    it("should return null when no winner", () => {
      const moves = Array(9).fill("");
      expect(calculateWinner(moves)).toBeNull();
    });

    it("should return X when X wins horizontally", () => {
      const moves = [
        Sign.X, Sign.X, Sign.X,
        "", "", "",
        "", "", ""
      ];
      expect(calculateWinner(moves)).toBe(Sign.X);
    });

    it("should return O when O wins vertically", () => {
      const moves = [
        Sign.O, "", "",
        Sign.O, "", "",
        Sign.O, "", ""
      ];
      expect(calculateWinner(moves)).toBe(Sign.O);
    });

    it("should return X when X wins diagonally", () => {
      const moves = [
        Sign.X, "", "",
        "", Sign.X, "",
        "", "", Sign.X
      ];
      expect(calculateWinner(moves)).toBe(Sign.X);
    });

    it("should return draw when all squares are filled and no winner", () => {
      const moves = [
        Sign.X, Sign.O, Sign.X,
        Sign.X, Sign.O, Sign.O,
        Sign.O, Sign.X, Sign.X
      ];
      expect(calculateWinner(moves)).toBe("draw");
    });
  });

  describe("getWhosTurnItIs", () => {
    it("should return X when no moves", () => {
      const moves = Array(9).fill("");
      expect(getWhosTurnItIs(moves)).toBe(Sign.X);
    });

    it("should return O when X has made a move", () => {
      const moves = [Sign.X, "", "", "", "", "", "", "", ""];
      expect(getWhosTurnItIs(moves)).toBe(Sign.O);
    });

    it("should return X when O has made a move", () => {
      const moves = [Sign.X, Sign.O, "", "", "", "", "", "", ""];
      expect(getWhosTurnItIs(moves)).toBe(Sign.X);
    });
  });

  describe("getPlayerNameFromSign", () => {
    it("should return player1 name for X", () => {
      const game: Game = {
        id: "1",
        player1_name: "Player1",
        player2_name: "Player2",
        moves: []
      };
      expect(getPlayerNameFromSign(Sign.X, game)).toBe("❌ Player1 ");
    });

    it("should return player2 name for O", () => {
      const game: Game = {
        id: "1",
        player1_name: "Player1",
        player2_name: "Player2",
        moves: []
      };
      expect(getPlayerNameFromSign(Sign.O, game)).toBe("⭕ Player2 ");
    });

    it("should return empty string for invalid sign", () => {
      const game: Game = {
        id: "1",
        player1_name: "Player1",
        player2_name: "Player2",
        moves: []
      };
      expect(getPlayerNameFromSign("invalid", game)).toBe("");
    });
  });
}); 