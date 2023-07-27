import { PAYMENT_NAME_BY_TYPE } from 'constants/type';
import { NumericFormat } from 'react-number-format';
import { formatCommaNumber } from 'utils';
import moment from 'moment';
import { DATE_TIME_FORMAT } from 'constants/time';

export const renderColumns = (handleStartBuy: any) => [
  {
    title: 'Advertiser',
    dataIndex: 'advertiser',
    key: 'advertiser',
    render: (value: string) => <span className=" text-xl font-semibold">{value}</span>,
  },
  {
    title: 'Token Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (value: string, record: any) => (
      <span className=" text-xl font-semibold">{`${value} ${record?.record?.currency?.name || ''}`}</span>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (value: any, record: any) => (
      <div>
        <NumericFormat
          value={value}
          displayType="text"
          thousandSeparator=","
          className=" text-lg font-semibold"
          decimalScale={4}
        />
        <span className="text-xs"> {record.fiatCurrencyName}</span>
      </div>
    ),
  },
  {
    title: 'Total Fiat Amount',
    dataIndex: 'fiatAmount',
    key: 'fiatAmount',
    render: (value: string, r: any) => {
      return <div className="font-semibold">{`${formatCommaNumber(value)} ${r.fiatCurrencyName}`}</div>;
    },
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: (value: any, record: any) => (
      <div className="flex flex-col items-start space-y-2 whitespace-nowrap">
        {record.listPaymentAccept.map((payment: any, index: number) => (
          <div className=" flex items-end justify-center rounded-lg bg-neutral px-2 py-1 text-xs" key={index}>
            {PAYMENT_NAME_BY_TYPE[payment.type as string]} | &nbsp;{' '}
            <span className="font-semibold">{payment.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (status: number, record: any) => moment(record?.record?.createdAt).format(DATE_TIME_FORMAT),
  },
  {
    title: 'Action',
    key: 'action',
    render: (v: any) => (
      <div
        onClick={() => handleStartBuy(v)}
        // className="rounded-lg font-semibold text-white h-12 flex items-center bg-green-600 justify-center w-fit px-8 cursor-pointer"
        className="btn-primary cursor-pointer"
      >
        Buy
      </div>
    ),
  },
];
