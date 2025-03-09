import React from 'react';
import { Game } from '../types/game';
import styles from './RoundRobinTable.module.css';

interface RoundRobinTableProps {
  games: Game[];
  currentTime: Date;
}

const RoundRobinTable: React.FC<RoundRobinTableProps> = ({ games }) => {
  const gamesByRound = games.reduce((acc, game) => {
    if (!acc[game.round]) {
      acc[game.round] = [];
    }
    acc[game.round].push(game);
    return acc;
  }, {} as { [key: string]: Game[] });

  const allCourts = Array.from(new Set(games.map(game => game.court)));
  const courts = allCourts.filter(court => court !== '');

  return (
    <div className="container">
      <div className={styles.gridContainer} style={{ gridTemplateColumns: `100px 150px repeat(${courts.length}, 1fr)` }}>
        <div className={styles.gridHeader}>
          <div className={styles.gridCell}>Round</div>
          <div className={styles.gridCell}>Start Time</div>
          {courts.map(court => (
            <div key={court} className={styles.gridCell}>{court}</div>
          ))}
        </div>
        {Object.keys(gamesByRound).map((round) => {
          const roundGames = gamesByRound[round];
          return (
            <div key={round} className={styles.gridRow}>
              <div className={styles.gridCell}>{round}</div>
              <div className={styles.gridCell}>{roundGames[0]?.startTime || 'N/A'}</div>
              {courts.map(court => {
                const game = roundGames.find(game => game.court === court);
                return (
                  <div key={court} className={styles.gridCell}>
                    {game && game.court && game.homeTeam && game.awayTeam ? (
                      game.homeTeamScore && game.awayTeamScore && round !== "10" ? (
                        <>
                          <div>{game.homeTeam} {game.homeTeamScore} - {game.awayTeamScore} {game.awayTeam}</div>
                        </>
                      ) : (
                        <>
                          <div>{game.homeTeam} vs {game.awayTeam}</div>
                          <div>Ref: {game.reffingTeam}</div>
                        </>
                      )
                    ) : 'No Game'}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoundRobinTable;
