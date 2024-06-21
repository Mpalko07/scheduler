// src/hooks/useVisualMode.js

import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      // Replace the last mode in history if replace is true
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      // Add new mode to history
      setHistory(prev => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      // Remove current mode from history
      setHistory(prev => prev.slice(0, prev.length - 1));
      // Set mode to the last mode in history
      setMode(history[history.length - 2]);
    }
  };

  return {
    mode,
    transition,
    back
  };
}
