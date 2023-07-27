import { Web3ReactProvider } from '@web3-react/core';
import { appWithTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRConfig } from 'swr';

import AppConnectWalletWrapper from '@components//AppConnectWalletWrapper';

import { LIBRARY_CONSTANTS } from 'constants/library';
import { Toaster } from 'react-hot-toast';
import { wrapper } from 'redux/configStore';

import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import ApplicationProvider, { useApplicationContext } from 'contexts/ApplicationContext';
import 'styles/global.css';
import '../styles/_app.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { getStoreConfigApi } from 'services/config/config';
import App, { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies';
import { DEFAULT_COLOR } from 'constants/config';
import Wrapper from '@components//Wrapper';
import 'swiper/css';
import 'swiper/css/pagination';

const onBeforeLift = (store: any) => () => {};

const MyApp = ({ Component, pageProps, dataConfig }: any) => {
  console.log('dataConfig', dataConfig);
  const store = useStore();
  const isClient = typeof window !== 'undefined';
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const primaryColor = dataConfig?.primaryColor || DEFAULT_COLOR.PRIMARY_COLOR;

  return (
    <SWRConfig>
      <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
        {isClient ? (
          <PersistGate persistor={(store as any).__persistor} loading={null} onBeforeLift={onBeforeLift(store)}>
            <ApplicationProvider>
              <AppConnectWalletWrapper>
                {getLayout(
                  <ConfigProvider
                    theme={{
                      hashed: false,
                      token: {
                        colorPrimary: primaryColor,
                      },
                    }}
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: primaryColor,
                        },
                      }}
                    >
                      <Wrapper dataConfig={dataConfig}>
                        <Component {...pageProps} />
                      </Wrapper>
                    </ConfigProvider>
                  </ConfigProvider>,
                )}
              </AppConnectWalletWrapper>
            </ApplicationProvider>
          </PersistGate>
        ) : (
          <AppConnectWalletWrapper>
            <ConfigProvider theme={{ hashed: false }}>
              <Component {...pageProps} />
            </ConfigProvider>
          </AppConnectWalletWrapper>
        )}
        <Toaster />
      </Web3ReactProvider>
    </SWRConfig>
  );
};

MyApp.getInitialProps = async (appContext: any) => {
  // Fetch data from your API
  let dataConfig = '';
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/store-config`);
    dataConfig = await res.json();
  } catch (e) {
    console.log('e', e);
  }

  let appProps = {};
  if (App.getInitialProps) {
    appProps = await App.getInitialProps(appContext);
  }
  nookies.set(appContext, 'dataConfig', JSON.stringify(dataConfig));

  return {
    ...appProps,
    dataConfig,
  };
};

// export async function getServerSideProps() {
//   // Fetch data from your API
//   console.log('here');
//   const res = await getStoreConfigApi();
//   console.log('res', res);

//   // Pass the data as props to the component
//   return {
//     props: {
//       res,
//     },
//   };
// }

export default wrapper.withRedux(appWithTranslation(MyApp));
