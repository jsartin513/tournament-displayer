import { NextPage } from 'next';
import React from 'react';
import { Game } from '../../types/game';
import { parseCSV } from '../../utils/parseCSV';
import RoundRobinTable from '../../components/RoundRobinTable';
import '../../styles/globals.css';

const Page: NextPage = async () => {
  const ROUND_ROBIN_SHEET_URL = "https://docs.google.com/spreadsheets/d/1CC5uA0ZrP39eM6OC0JgE8JlwDrqpr4-ykp6kIKtgHXQ/export?format=csv&gid=182568368";
  // const BRACKET_SHEET_URL = "https://docs.google.com/spreadsheets/d/1CC5uA0ZrP39eM6OC0JgE8JlwDrqpr4-ykp6kIKtgHXQ/export?format=csv&gid=2111325620";

  const roundRobinResponse = await fetch(ROUND_ROBIN_SHEET_URL);
  const roundRobinData = await roundRobinResponse.text();

  // const bracketResponse = await fetch(BRACKET_SHEET_URL);
  // const bracketData = await bracketResponse.text();

  const roundRobinParsed: Game[] = parseCSV(roundRobinData);

  return (
    <RoundRobinTable games={roundRobinParsed} currentTime={new Date()} />
  );
};

export default Page;
