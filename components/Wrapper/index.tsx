import { useApplicationContext } from 'contexts/ApplicationContext';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';

function Wrapper({ dataConfig, children }: any) {
  const { appConfig, setAppConfig } = useApplicationContext();
  useEffect(() => {
    if (isEmpty(appConfig)) {
      setAppConfig(dataConfig);
    }
  }, []);
  return <div>{children}</div>;
}

export default Wrapper;
