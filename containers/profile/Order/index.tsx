import { Select, Table } from 'antd';
import { useApplicationContext } from 'contexts/ApplicationContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCurrencyApi } from 'services/currency';
import { getSellOrderApi } from 'services/order';
import { orderColumns } from './columns';
import { ORDER_STATUS, ORDER_TYPE, STATUS_BY_VALUE } from 'constants/type';

const Order = () => {
  const { profile, isAuthenticated, appChainId } = useApplicationContext();
  const [listCurrency, setListCurrency] = useState<any[]>([]);
  const [listOrder, setListOrder] = useState([]);
  const [paramsSearch, setParamsSearch] = useState<{ currencyId: any; type: number; status: number }>({
    currencyId: null,
    type: ORDER_TYPE[0].value,
    status: ORDER_STATUS[0].value,
  });

  useEffect(() => {
    if (listCurrency.length)
      setParamsSearch({
        ...paramsSearch,
        currencyId: listCurrency?.filter((item) => item.chainId === appChainId)?.[0]?.id,
      });
  }, [listCurrency, appChainId]);

  useEffect(() => {
    const getListCurrency = async () => {
      const res = await getCurrencyApi();
      if (res.data) setListCurrency(res.data);
    };

    getListCurrency();
  }, []);

  useEffect(() => {
    const getListOrder = async () => {
      const params = {
        currencyId: paramsSearch.currencyId || null,
        status: paramsSearch.status || null,
        chainId: appChainId,
      };
      const res = await getSellOrderApi(params);
      if (res) setListOrder(res.data || []);
    };
    if (isAuthenticated) {
      getListOrder();
    }
  }, [isAuthenticated, paramsSearch, appChainId]);

  const mappedListOrder = listOrder.map((order: any) => ({
    id: order.id,
    fiatAmount: order.currency.exchangeRate * order.amount * order.fiatCurrency.exchangeRate,
    amount: order.amount,
    price: order.currency.exchangeRate * order.fiatCurrency.exchangeRate,
    counterparty: `${profile?.firstName} ${profile?.lastName}`,
    status: STATUS_BY_VALUE[order?.status as number],
    currency: order.currency,
  }));

  const onChangeSelect = (value: any, field: string) => {
    setParamsSearch({ ...paramsSearch, [field]: value });
  };

  return (
    <div>
      <div className="flex flex-col items-start text-gray-400 px-4">
        <div className="mb-5 md:grid-cols-3 grid-cols-2 grid gap-x-3 gap-y-3">
          <div className="flex flex-col items-start space-y-1">
            <span className="text-black">Coin</span>
            <Select
              onChange={(value: any) => onChangeSelect(value, 'currencyId')}
              value={paramsSearch.currencyId}
              options={
                listCurrency.length
                  ? [
                      { value: '', label: 'All' },
                      ...listCurrency
                        .filter((item) => item.chainId === appChainId)
                        .map((currency: any, index: number) => ({
                          label: (
                            <div className="flex items-center space-x-2 h-full" key={index}>
                              <span>{currency.name}</span>
                            </div>
                          ),
                          value: currency?.id,
                        })),
                    ]
                  : []
              }
              className="w-[8rem]"
            />
          </div>
          <div className="flex flex-col items-start space-y-1">
            <span className="text-black">Type</span>
            <Select
              options={ORDER_TYPE}
              className="!w-[9rem]"
              value={paramsSearch.type}
              onChange={(value: any) => onChangeSelect(value, 'type')}
            />
          </div>
          <div className="flex flex-col items-start space-y-1">
            <span className="text-black">Status</span>
            <Select
              options={ORDER_STATUS}
              className="!w-[9rem]"
              value={paramsSearch.status}
              onChange={(value: any) => onChangeSelect(value, 'status')}
            />
          </div>
        </div>
        <Table
          scroll={{ x: true }}
          columns={orderColumns}
          dataSource={mappedListOrder}
          className="custom-table"
          bordered={false}
        />
      </div>
    </div>
  );
};

export default Order;
