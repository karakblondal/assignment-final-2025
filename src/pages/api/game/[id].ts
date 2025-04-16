import { NextApiRequest, NextApiResponse } from "next";
import { Game } from "../../lib/gameStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: "Invalid game ID" });
  }

  if (req.method === "GET") {
    try {
      const game = await Game.get(id);
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      return res.status(200).json(game);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get game" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { moves } = req.body;
      const game = await Game.update(id, moves);
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      return res.status(200).json(game);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update game" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
