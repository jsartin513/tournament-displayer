import React from 'react';
import { Game } from '../types/game';
import RoundRow from './RoundRow';
import styles from './RoundRobinTable.module.css';

interface RoundRobinTableProps {
  games: Game[];
  currentTime: Date;
}

const RoundRobinTable: React.FC<RoundRobinTableProps> = ({ games, currentTime }) => {
  const gamesByRound = games.reduce((acc, game) => {
    if (!acc[game.round]) {
      acc[game.round] = [];
    }
    acc[game.round].push(game);
    return acc;
  }, {} as { [key: string]: Game[] });

  return (
    <div>
      <h1>Round Robin Data</h1>
      <table>
        <thead>
          <tr>
            <th className={styles.tableCell}>Round</th>
            <th className={styles.tableCell}>Start Time</th>
            <th className={styles.tableCell}>Court</th>
            <th className={styles.tableCell}>Home Team</th>
            <th className={styles.tableCell}></th>
            <th className={styles.tableCell}>Away Team</th>
            <th className={styles.tableCell}></th>
            <th className={styles.tableCell}>Ref</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(gamesByRound).map((round) => {
            const roundGames = gamesByRound[round];
            const isCurrentRound = roundGames.some(game => {
              const gameStartTime = new Date(game.startTime).getTime();
              return gameStartTime <= currentTime.getTime() && currentTime.getTime() < gameStartTime + 60 * 60 * 1000; // Assuming each game lasts 1 hour
            });
            return (
              <RoundRow key={round} round={round} games={roundGames} isCurrentRound={isCurrentRound} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoundRobinTable;
