import { Button } from 'antd';
import BigNumber from 'bignumber.js';
import { TRADE_STATUS_INFO } from 'constants/trade';

export const columns = [
  {
    title: 'No',
    key: 'no',
    render: (v: any, r: any, i: number) => i + 1,
  },
  {
    title: 'Token',
    key: 'token',
    dataIndex: 'currency',
    render: (currency: any) => currency.name,
  },
  {
    title: 'Amount',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
  {
    title: 'Chain',
    key: 'chain',
    dataIndex: 'currency',
    render: (currency: any) => currency.chainName,
  },
  // {
  //   title: 'Actions',
  //   key: 'actions',
  //   dataIndex: 'id',
  //   render: (id: string) => (
  //     <Button className="btn-action" type="link">
  //       Withdraw
  //     </Button>
  //   ),
  // },
];
