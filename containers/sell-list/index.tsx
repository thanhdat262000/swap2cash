import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getListSellApi } from 'services/buy';
import { columns } from './columns';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { removeEmptyKey } from 'utils';
import OptionsBar from './OptionsBar';

const SellList = ({ listCurrency, listCurrencyFiat }: any) => {
  const [data, setData] = useState<any>([]);
  const { appChainId } = useApplicationContext();
  const [paramsSearch, setParamsSearch] = useState<any>({
    currencyId: null,
    fiatCurrencyId: null,
    status: null,
  });

  const { currencyId, fiatCurrencyId, status } = paramsSearch;

  const fetchBuyDetail = async () => {
    if (!appChainId) {
      return;
    }
    const paramQuery = {
      currencyId,
      fiatCurrencyId,
      status,
      chainId: appChainId,
    };
    const res = await getListSellApi(removeEmptyKey(paramQuery));
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchBuyDetail();
  }, [currencyId, fiatCurrencyId, status, appChainId]);

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
          <Table columns={columns} dataSource={data} className="custom-table" scroll={{ x: 900 }} />
        </div>
      </div>
    </div>
  );
};

export default SellList;
