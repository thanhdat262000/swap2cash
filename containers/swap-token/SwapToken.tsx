import { useEffect } from 'react';
import { Widget, WidgetConfig } from '@rango-dev/widget-embedded';

const SwapToken = () => {
  const config = {
    apiKey: '6c3a8e6e-4d6c-4214-a38a-2c151b0f2213',
  };

  useEffect(() => {
    const config = {
      // This API key is only for test purpose. Don't use it in production.
      apiKey: 'c6381a79-2817-4602-83bf-6a641a409e32',
    };

    window.rangoWidget.init(config);
  }, []);

  return (
    <div className="swap-token flex align-middle justify-center">
      {/* <Widget config={config} /> */}
      <div id="rango-widget-container" className="swap-widget"></div>
    </div>
  );
};

export default SwapToken;
