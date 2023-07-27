import { Button, Typography } from 'antd';
import BigNumber from 'bignumber.js';
import { URL } from 'constants/routes';
import { DATE_TIME_FORMAT } from 'constants/time';
import { TRADE_STATUS_INFO } from 'constants/trade';
import { PAYMENT_NAME_BY_TYPE, PutOnSaleStatus, STATUS_TEXT_SELL_BY_VALUE } from 'constants/type';
import { getPaymentType } from 'utils/trade';
import moment from 'moment';

const { Paragraph } = Typography;

export const columns = (userId: any, onCancelSellOrder: any) => [
  {
    title: 'No',
    key: 'no',
    render: (v: any, r: any, i: number) => i + 1,
  },
  {
    title: 'Token',
    key: 'currency',
    dataIndex: 'currency',
    render: (val: any) => val.name,
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Avaiable',
    key: 'availableAmount',
    dataIndex: 'availableAmount',
  },
  {
    title: 'Price',
    key: 'price',
    render: ({ currency, fiatCurrency }: any) => {
      const currencyName = fiatCurrency.name;
      const price = new BigNumber(currency.exchangeRate)
        .multipliedBy(new BigNumber(fiatCurrency.exchangeRate))
        .dp(2)
        .toString();
      return `${price} ${currencyName}`;
    },
  },
  {
    title: 'Payment Method',
    dataIndex: 'listPaymentAccept',
    key: 'listPaymentAccept',
    render: (listPaymentAccept: any) => (
      <div className="flex flex-col items-start space-y-2">
        {listPaymentAccept.map((payment: any, index: number) => (
          <div className=" flex items-end justify-center rounded-lg bg-neutral px-2 py-1 text-xs" key={index}>
            {PAYMENT_NAME_BY_TYPE[payment.type as string]} | &nbsp;{' '}
            <span className="font-semibold">{payment.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status: number) => STATUS_TEXT_SELL_BY_VALUE[status] || '',
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
    dataIndex: 'actions',
    render: (status: number, record: any) => {
      if (record.userId === userId && record.status === PutOnSaleStatus.ACTIVE) {
        return <Button onClick={onCancelSellOrder(record)}>Cancel</Button>;
      }
    },
  },
];
