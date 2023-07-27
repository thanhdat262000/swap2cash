import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { Typography } from 'antd';
import { MdContentCopy, MdDoneAll } from 'react-icons/md';
import moment from 'moment';

const { Paragraph } = Typography;
export const referralColumns = [
  {
    title: 'NO',
    dataIndex: 'no',
    key: 'no',
    width: '8%',
  },
  {
    title: 'Chain',
    dataIndex: 'chain',
    key: 'chain',
    width: '10%',

    render: (val: any, record: any) => {
      return <div className="">{record?.currency?.chainName}</div>;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '10%',

    render: (val: any, record: any) => {
      return <div className="">{`${record?.totalAmount} ${record.currency?.name}`}</div>;
    },
  },
  {
    title: 'Transaction',
    dataIndex: 'txId',
    key: 'txId',
    width: '10%',

    render: (val: any, record: any) => {
      return <div className="">{`${record?.withdrawTransaction?.txId}`}</div>;
    },
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '10%',

    render: (val: any, record: any) => {
      return <div className="">{moment(record.createdAt).format('DD/MM/YYYY')}</div>;
    },
  },
];
