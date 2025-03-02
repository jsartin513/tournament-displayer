import 'react';


export const Page = async () => {
  const ROUND_ROBIN_SHEET_URL = "https://docs.google.com/spreadsheets/d/1CC5uA0ZrP39eM6OC0JgE8JlwDrqpr4-ykp6kIKtgHXQ/export?format=csv&gid=182568368"
  // const BRACKET_SHEET_URL = "https://docs.google.com/spreadsheets/d/1CC5uA0ZrP39eM6OC0JgE8JlwDrqpr4-ykp6kIKtgHXQ/export?format=csv&gid=2111325620"

  const roundRobinResponse = await fetch(ROUND_ROBIN_SHEET_URL);
  const roundRobinData = await roundRobinResponse.text();


  // const bracketResponse = await fetch(BRACKET_SHEET_URL);
  // const bracketData = await bracketResponse.text();

  


  function parseCSV(csv: string) {
    const SHARED_HEADERS = ["Round #", "Start Time"]
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");
    const courtHeaders = headers.filter((header) => !SHARED_HEADERS.includes(header))
    for (let i = 1; i < lines.length; i+=3) {
      const game = {};
      const currentLine = lines[i].split(",");
      const nextLine = lines[i+1].split(",");
      const nextNextLine = lines[i+2].split(",");
      for (let j = 0; j < SHARED_HEADERS.length; j++) {
        game[SHARED_HEADERS[j]] = currentLine[j];
      }
      for (let j = 0; j < courtHeaders.length; j++) {
        const court = courtHeaders[j];
        const homeTeam = currentLine[j];
        const awayTeam = nextLine[j];
        const reffingTeam = nextNextLine[j];
        const courtGame = {
          court,
          homeTeam,
          awayTeam,
          reffingTeam,
          ...game
        }
        result.push(courtGame);
      }
    }
    return result;
  }

  const roundRobinParsed = parseCSV(roundRobinData);


  return <div>
    <h1>Round Robin Data</h1>
    <table>
      <thead>
        <tr>
          <th>Court</th>
          <th>Round</th>
          <th>Start Time</th>
          <th>Home Team</th>
          <th>Away Team</th>
          <th>Ref</th>
        </tr>
      </thead>
      <tbody>
        {roundRobinParsed.map((courtSchedule, index) => {
          return <tr key={`${courtSchedule.court}-${courtSchedule["Round #"]}-${index}`}>
            <td>{courtSchedule.court}</td>
            <td>{courtSchedule["Round #"]}</td>
            <td>{courtSchedule["Start Time"]}</td>
            <td>{courtSchedule.homeTeam}</td>
            <td>{courtSchedule.awayTeam}</td>
            <td>{courtSchedule.reffingTeam}</td>
          </tr>

        })}
      </tbody>
    </table>

  </div>;
};

export default Page;
