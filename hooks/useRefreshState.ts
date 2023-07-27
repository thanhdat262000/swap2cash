import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export function useRefreshState() {
  const [refreshState, setRefreshState] = useState(uuid());
  const setNewRefreshState = () => {
    setRefreshState(uuid());
  };
  return { refreshState, setNewRefreshState };
}
