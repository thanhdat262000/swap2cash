import { Button, Typography } from 'antd';
import BigNumber from 'bignumber.js';
import { URL } from 'constants/routes';
import { DATE_TIME_FORMAT } from 'constants/time';
import { TRADE_STATUS, TRADE_STATUS_INFO } from 'constants/trade';
import { getPaymentType } from 'utils/trade';
import moment from 'moment';

const { Paragraph } = Typography;

export const columns = (onShowEvidenceModal: any) => [
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
    title: 'Payment',
    key: 'payment',
    dataIndex: 'payment',
    render: (value: any) => (value ? getPaymentType(value.type) : 'N/A'),
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
    render: (id: string, record: any) => {
      if (record.status === TRADE_STATUS.PENDING_BY_DISABLE_USER) {
        return (
          <Button className="btn-action" type="link" onClick={onShowEvidenceModal(record)}>
            Upload Evidence
          </Button>
        );
      }
      return (
        <Button className="btn-action" type="link" href={`${URL.P2P}/buy/${id}`}>
          View Detail
        </Button>
      );
    },
  },
];
