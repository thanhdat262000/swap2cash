import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getListOnSaleApi } from 'services/buy';
import { columns } from './columns';
import { useRouter } from 'next/router';
import { useApplicationContext } from 'contexts/ApplicationContext';
import OptionsBar from './OptionsBar';
import { removeEmptyKey } from 'utils';
import { cancelPutOnSaleApi, updateTxPutOnSaleApi } from 'services/order';
import showMessage from '@components//Message';
import TYPE_CONSTANTS from 'constants/type';
import BaseWalletService from 'services/BaseWalletService';
import Abi from 'constants/abi/Swap2Cash.json';
import { useWeb3React } from '@web3-react/core';
import { useModal } from 'hooks/useModal';
import ModalCancelSellOrder from './ModalCancelSellOrder';

const OnSaleList = ({ listCurrency, listCurrencyFiat }: any) => {
  const [data, setData] = useState<any>([]);
  const { visible, onOpenModal, onCloseModal } = useModal();
  const [recordSelected, setRecordSelected] = useState<any>();
  const { appChainId, profile } = useApplicationContext();
  const [paramsSearch, setParamsSearch] = useState<any>({
    currencyId: null,
    fiatCurrencyId: null,
    status: null,
  });
  const { account, library } = useWeb3React();

  const { currencyId, fiatCurrencyId, status } = paramsSearch;
  console.log('recordSelected', recordSelected);
  const fetchListOnSale = async () => {
    if (!appChainId) {
      return;
    }
    const paramQuery = {
      currencyId,
      fiatCurrencyId,
      status,
      chainId: appChainId,
    };
    const res = await getListOnSaleApi(removeEmptyKey(paramQuery));
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchListOnSale();
  }, [currencyId, fiatCurrencyId, status, appChainId]);

  const onCancelSellOrder = (record: any) => async () => {
    onOpenModal();
    setRecordSelected(record);
  };

  const callbackSuccess = () => {
    onCloseModal();
    showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Canceling sell order');
    fetchListOnSale();
  };

  return (
    <div>
      <div className="bg-white rounded-xl">
        <OptionsBar
          currencyId={currencyId}
          fiatCurrencyId={fiatCurrencyId}
          listCurrency={listCurrency}
          listCurrencyFiat={listCurrencyFiat}
          paramsSearch={paramsSearch}
          setParamsSearch={setParamsSearch}
        />
        <div className="flex items-center text-gray-400 mt-4">
          <Table
            columns={columns(profile?.id, onCancelSellOrder)}
            dataSource={data}
            className="custom-table"
            scroll={{ x: 900 }}
          />
        </div>
      </div>
      {visible && (
        <ModalCancelSellOrder
          visible={visible}
          onClose={onCloseModal}
          callbackSuccess={callbackSuccess}
          listWalletData={data}
          id={recordSelected?.id}
        />
      )}
    </div>
  );
};

export default OnSaleList;
