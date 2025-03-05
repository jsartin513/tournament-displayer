import { Game } from "../types/game";

export function parseCSV(csv: string): Game[] {
  const SHARED_HEADERS = ["Round #", "Start Time"];
  const sharedHeaderMapping: { [key: string]: string } = {
    "Round #": "round",
    "Start Time": "startTime",
  };

  const lines = csv.split("\n");
  const result: Game[] = [];
  const headers = lines[0].split(",");
  const courtHeaders = headers.filter(
    (header) => !SHARED_HEADERS.includes(header)
  );
  for (let i = 1; i < lines.length; i += 3) {
    const game: { [key: string]: string } = {};

    SHARED_HEADERS.forEach((header) => {
      const value = lines[i].split(",")[headers.indexOf(header)];
      game[sharedHeaderMapping[header]] = value;
    });

    const parseLine = (line: string) => {
      const result = [];
      let current = "";
      let inQuotes = false;
      for (const char of line) {
        if (char === '"' && inQuotes) {
          inQuotes = false;
        } else if (char === '"' && !inQuotes) {
          inQuotes = true;
        } else if (char === "," && !inQuotes) {
          result.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current);
      return result;
    };

    const currentLine = parseLine(lines[i]);
    const nextLine = parseLine(lines[i + 1]);
    const nextNextLine = parseLine(lines[i + 2]);
    for (let j = 2; j < courtHeaders.length; j += 2) {
      const court = courtHeaders[j - 2]; // Align to the right court header
      const homeTeam = currentLine[j];
      const homeTeamScore = currentLine[j + 1];
      const awayTeam = nextLine[j];
      const awayTeamScore = nextLine[j + 1];
      const reffingTeam = nextNextLine[j];
      const courtGame: Game = {
        court,
        homeTeam,
        homeTeamScore,
        awayTeam,
        awayTeamScore,
        reffingTeam,
        round: game.round,
        startTime: game.startTime,
      };
      result.push(courtGame);
    }
  }
  return result;
}
