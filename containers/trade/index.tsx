import ModalBuy from '@components//Modal/ModalBuy';
import { BUY_CRYPTO_STEP } from '@components//Modal/ModalBuy/consts';
import ModalCreateSellOrder from '@components//Modal/ModalCreateSellOrder';
import ModalOTP from '@components//Modal/ModalOTP';
import { useWeb3React } from '@web3-react/core';
import { Table } from 'antd';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { createPurchase } from 'services/buy';
import { getAllSellOrderApi } from 'services/order';
import OptionsBar from './OptionsBar';
import { BigNumber } from 'bignumber.js';
import { removeEmptyKey } from 'utils';
import { renderColumns } from './column';

const TradeContainer = ({ listCurrency, listCurrencyFiat }: any) => {
  const [visible, setVisible] = useState(false);
  const { profile, appChainId } = useApplicationContext();
  const { account } = useWeb3React();
  const { query } = useRouter();
  const [buyStep, setBuyStep] = useState<any>(null);
  const [listSellOrder, setListSellOrder] = useState({ data: [], meta: {} });
  const [buyData, setBuyData] = useState<any>();
  const [otpData, setOtpData] = useState<any>();

  // const { currencyId, fiatCurrencyId } = query;
  const [paramsSearch, setParamsSearch] = useState<{ currencyId: any; fiatCurrencyId: any }>({
    currencyId: null,
    fiatCurrencyId: null,
  });

  const { currencyId, fiatCurrencyId } = paramsSearch;

  useEffect(() => {
    const getListSellOrder = async () => {
      const params = {
        chainId: appChainId,
        currencyId,
        fiatCurrencyId,
      };
      const res = await getAllSellOrderApi(removeEmptyKey(params));
      if (res) setListSellOrder({ data: res.data, meta: res.meta });
    };
    getListSellOrder();
  }, [currencyId, fiatCurrencyId, appChainId]);

  const mappedListSellOrderData = (listSellOrder?.data || []).map((order: any) => ({
    advertiser: order?.user?.userName || `${order.user.firstName} ${order.user.lastName}`,
    amount: order.amount,
    price: order.currency.exchangeRate * order.fiatCurrency.exchangeRate,
    fiatCurrencyName: order.fiatCurrency.name,
    fiatAmount: order.currency.exchangeRate * order.amount * order.fiatCurrency.exchangeRate,
    listPaymentAccept: order.listPaymentAccept,
    record: order,
  }));

  const handleStartBuy = (v: any) => {
    const { availableAmount: avaiable, currency, fiatCurrency } = v.record;
    console.log('v.record', v.record);
    const buyData = {
      ...v.record,
      avaiable,
      crypto: currency.name,
      fiat: fiatCurrency.name,
      max: 1200000,
      min: 150000,
      rate: new BigNumber(currency.exchangeRate).multipliedBy(new BigNumber(fiatCurrency.exchangeRate)).toString(),
    };
    setBuyData(buyData);
    setBuyStep(BUY_CRYPTO_STEP.INPUT);
  };

  const onCreateSellOrder = () => {
    if (!profile?.listPayment.length) toast.error('Please go to Profile and add a payment method first.');
    else setVisible(true);
  };

  const cancelBuy = () => {
    setBuyStep(null);
  };

  const onSubmitBuy = async (values: any) => {
    const data = {
      buyAmount: values.receive,
      putOnSaleId: buyData.id,
    };
    const res = await createPurchase(data);
    if (res) {
      setOtpData(res);
      setBuyStep(BUY_CRYPTO_STEP.VERIFY);
      return;
    }
    cancelBuy();
  };

  return (
    <div>
      <div className="bg-white rounded-xl">
        <OptionsBar
          onCreateSellOrder={onCreateSellOrder}
          setVisible={setVisible}
          currencyId={currencyId}
          fiatCurrencyId={fiatCurrencyId}
          paramsSearch={paramsSearch}
          setParamsSearch={setParamsSearch}
          listCurrency={listCurrency}
          listCurrencyFiat={listCurrencyFiat}
        />
        <div className="flex items-center text-gray-400 mt-4">
          <Table
            columns={renderColumns(handleStartBuy)}
            dataSource={mappedListSellOrderData}
            className="custom-table"
            bordered={false}
            scroll={{ x: 900 }}
          />
        </div>
      </div>
      <ModalCreateSellOrder visible={visible} onClose={() => setVisible(false)} />
      {buyStep === BUY_CRYPTO_STEP.INPUT && (
        <ModalBuy visible onClose={cancelBuy} data={buyData} onSubmit={onSubmitBuy} />
      )}
      {buyStep === BUY_CRYPTO_STEP.VERIFY && <ModalOTP visible onClose={cancelBuy} data={otpData} />}
    </div>
  );
};

export default TradeContainer;
