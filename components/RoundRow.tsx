import React from 'react';
import { Game } from '../types/game';
import styles from './RoundRobinTable.module.css';

interface RoundRowProps {
  round: string;
  games: Game[];
  isCurrentRound: boolean;
}

const RoundRow: React.FC<RoundRowProps> = ({ round, games, isCurrentRound }) => {
  return (
    <tr className={isCurrentRound ? styles.currentRound : ''}>
      <td className={styles.tableCell}>{round}</td>
      <td className={styles.tableCell}>{games[0].startTime}</td>
      <td className={styles.tableCell}>
        {games.map((game, index) => (
          <div key={index}>{game.court}</div>
        ))}
      </td>
      <td className={styles.tableCell}>
        {games.map((game, index) => (
          <div key={index}>{game.homeTeam}</div>
        ))}
      </td>
      <td className={styles.tableCell}>
        {games.map((game, index) => (
          <div key={index}>{game.homeTeamScore}</div>
        ))}
      </td>
      <td className={styles.tableCell}>
        {games.map((game, index) => (
          <div key={index}>{game.awayTeam}</div>
        ))}
      </td>
      <td className={styles.tableCell}>
        {games.map((game, index) => (
          <div key={index}>{game.awayTeamScore}</div>
        ))}
      </td>
      <td className={styles.tableCell}>
        {games.map((game, index) => (
          <div key={index}>{game.reffingTeam}</div>
        ))}
      </td>
    </tr>
  );
};

export default RoundRow;
