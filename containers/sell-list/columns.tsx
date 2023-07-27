import { Button } from 'antd';
import BigNumber from 'bignumber.js';
import { URL } from 'constants/routes';
import { DATE_TIME_FORMAT } from 'constants/time';
import { TRADE_STATUS_INFO } from 'constants/trade';
import moment from 'moment';

export const columns = [
  {
    title: 'No',
    key: 'no',
    render: (v: any, r: any, i: number) => i + 1,
  },
  {
    title: 'Token Amount',
    key: 'buyAmount',
    dataIndex: 'buyAmount',
    render: (val: string, record: any) => `${val} ${record.putOnSale.currency.name}`,
  },
  {
    title: 'Fiat Amount',
    key: 'buyFiatAmount',
    dataIndex: 'buyFiatAmount',
    render: (val: string, record: any) => `${val} ${record.putOnSale.fiatCurrency.name}`,
  },
  {
    title: 'Price',
    key: 'price',
    render: (value: string, { exchangeRate, fiatExchangeRate, putOnSale }: any) => {
      const currencyName = putOnSale.fiatCurrency.name;
      const price = new BigNumber(exchangeRate).multipliedBy(new BigNumber(fiatExchangeRate)).dp(2).toString();
      return `${price} ${currencyName}`;
    },
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status: number) => TRADE_STATUS_INFO[status]?.text,
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (status: number, record: any) => moment(record?.createdAt).format(DATE_TIME_FORMAT),
  },

  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'id',
    render: (id: string) => (
      <Button className="btn-action" type="link" href={`${URL.P2P}/sell/${id}`}>
        View Detail
      </Button>
    ),
  },
];
