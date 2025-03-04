export interface Game {
  court: string;
  round: string;
  startTime: string;
  homeTeam: string;
  homeTeamScore: string | null;
  awayTeam: string;
  awayTeamScore: string | null;
  reffingTeam: string;
}
