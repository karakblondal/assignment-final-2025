import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import { EMOJI, Sign } from "../utils/constants";

export default function Home() {
  const router = useRouter();
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!player1Name || !player2Name) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/games", {
        player1_name: player1Name,
        player2_name: player2Name,
      });
      router.push(`/game/${response.data.id}`);
    } catch (err) {
      setError("Failed to create game");
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Tic Tac Toe #️⃣</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="player1">❌ Your Name</label>
            <input
              id="player1"
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder={`${EMOJI[Sign.X]} Your Name`}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="player2">⭕ Opponent Name</label>
            <input
              id="player2"
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder={`${EMOJI[Sign.O]} Opponent Name`}
              required
            />
          </div>
          <button type="submit" disabled={isLoading || !player1Name || !player2Name}>
            {isLoading ? "Creating Game..." : "Start Game"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <Link href="/game/list">See all games</Link>
      </div>
    </>
  );
}
