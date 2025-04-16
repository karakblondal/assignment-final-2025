import { Game } from "../lib/gameStore";
import styles from "../styles/Home.module.css";
import { Sign } from "../utils/constants";
import { getPlayerNameFromSign } from "../utils/gameUtils";

interface Props {
  winner: Sign | string;
  game: Game;
}

export function WinnerAnnouncement({ winner, game }: Props) {
  if (winner === "draw") {
    return (
      <h1 className={styles.title}>
        🤝
        <div>Jafntefli!</div>
      </h1>
    );
  }
  
  return (
    <h1 className={styles.title}>
      🎉🎊🍾🏆
      <div>{getPlayerNameFromSign(winner, game)} Won</div>
    </h1>
  );
}
