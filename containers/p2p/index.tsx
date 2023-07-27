import { Tabs } from 'antd';
import { URL } from 'constants/routes';
import { P2P_TYPE } from 'constants/trade';
import BuyList from 'containers/buy-list';
import OnSaleList from 'containers/on-sale-list';
import SellList from 'containers/sell-list';
import TradeContainer from 'containers/trade';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCurrencyApi, getCurrencyFiatApi } from 'services/currency';

const P2P = () => {
  const router = useRouter();
  const type = router.query.type as string;

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

  const onChange = (type: string) => {
    router.push({
      pathname: URL.P2P,
      query: {
        type,
      },
    });
  };

  if (!router.isReady) {
    return <></>;
  }

  return (
    <div className="p2p-page">
      <div className="title mb-4">P2P</div>
      <Tabs
        onChange={onChange}
        activeKey={type}
        destroyInactiveTabPane
        items={[
          {
            key: P2P_TYPE.BUY,
            label: 'Buy',
            children: <TradeContainer listCurrency={listCurrency} listCurrencyFiat={listCurrencyFiat} />,
          },
          {
            key: P2P_TYPE.SELL,
            label: 'Sell',
            children: <OnSaleList listCurrency={listCurrency} listCurrencyFiat={listCurrencyFiat} />,
          },
          {
            key: P2P_TYPE.BUY_ORDER,
            label: 'Buy Orders',
            children: <BuyList listCurrency={listCurrency} listCurrencyFiat={listCurrencyFiat} />,
          },
          {
            key: P2P_TYPE.SELL_ORDER,
            label: 'Sell Orders',
            children: <SellList listCurrency={listCurrency} listCurrencyFiat={listCurrencyFiat} />,
          },
        ]}
      />
    </div>
  );
};

export default P2P;
