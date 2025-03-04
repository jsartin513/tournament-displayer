import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

const ModeSelector: React.FC = () => {
  const router = useRouter();
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [mockedTime, setMockedTime] = useState(new Date().toISOString().substring(0, 16));

  const handleModeChange = (mode: string) => {
    interface QueryType extends ParsedUrlQueryInput {
      mode: string;
      time?: string;
    }
    const query: QueryType = { ...router.query, mode };
    if (mode === 'test') {
      query.time = mockedTime;
    } else {
      delete query.time;
    }
    router.push({ pathname: router.pathname, query });
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          checked={isLiveMode}
          onChange={() => {
            setIsLiveMode(true);
            handleModeChange('live');
          }}
        />
        Live Mode
      </label>
      <label>
        <input
          type="radio"
          checked={!isLiveMode}
          onChange={() => {
            setIsLiveMode(false);
            handleModeChange('test');
          }}
        />
        Test Mode
      </label>
      {!isLiveMode && (
        <input
          type="datetime-local"
          value={mockedTime}
          onChange={(e) => {
            setMockedTime(e.target.value);
            handleModeChange('test');
          }}
        />
      )}
    </div>
  );
};

export default ModeSelector;
