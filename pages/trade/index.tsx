import PublicLayout from '@components//Layout/Public';
import { useEffect, useState } from 'react';
import { getCurrencyApi, getCurrencyFiatApi } from 'services/currency';

import TradeContainer from 'containers/trade';
import { ReactElement } from 'react';
import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';
import { getStoreConfigApi } from 'services/config/config';

function Trade() {
  const [listCurrency, setListCurrency] = useState<any[]>([]);
  const [listCurrencyFiat, setListCurrencyFiat] = useState<any[]>([]);

  useEffect(() => {
    const getListCurrency = async () => {
      try {
        const res = await getCurrencyApi();
        if (res.data) setListCurrency(res.data);
      } catch (e) {
        console.log('e', e);
      }
    };

    const getListCurrencyFiat = async () => {
      try {
        const res = await getCurrencyFiatApi();
        if (res.data) setListCurrencyFiat(res.data);
      } catch (e) {
        console.log('e', e);
      }
    };
    getListCurrency();
    getListCurrencyFiat();
  }, []);
  return <TradeContainer listCurrency={listCurrency} listCurrencyFiat={listCurrencyFiat} />;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Trade.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Trade;
