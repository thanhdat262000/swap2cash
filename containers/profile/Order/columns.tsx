import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { Typography } from 'antd';
import { MdContentCopy, MdDoneAll } from 'react-icons/md';

const { Paragraph } = Typography;
export const orderColumns = [
  {
    title: 'Coin',
    key: 'coin',
    render: (value: any, record: any) => (
      <div className="flex items-center space-x-4">
        <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${record?.currency?.iconUrl}`} width={25} height={25} />
        <span>{record?.currency?.name}</span>
      </div>
    ),
  },
  {
    title: 'Order Id',
    dataIndex: 'id',
    key: 'id',
    width: 250,
    render: (value: string) => (
      <Paragraph
        copyable={{ icon: [<MdContentCopy key="copy-icon" />, <MdDoneAll key="copied-icon" />] }}
        className="truncate !mb-0"
      >
        {value}
      </Paragraph>
    ),
  },
  {
    title: 'Fiat Amount',
    dataIndex: 'fiatAmount',
    key: 'fiatAmount',
    render: (value: any) => (
      <div>
        <NumericFormat
          value={value}
          displayType="text"
          thousandSeparator=","
          className="font-semibold"
          decimalScale={4}
        />
        <span className="text-xs"> VND</span>
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (value: string) => (
      <div>
        <NumericFormat
          value={value}
          displayType="text"
          thousandSeparator=","
          className="font-semibold"
          decimalScale={4}
        />
        <span className="text-xs"> VND</span>
      </div>
    ),
  },
  {
    title: 'Token Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Counterparty',
    dataIndex: 'counterparty',
    key: 'counterparty',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: string) => <span className="font-semibold">{value}</span>,
  },
];
