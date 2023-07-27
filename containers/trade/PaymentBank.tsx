import { Row, Typography } from 'antd';
import cx from 'classnames';
const { Paragraph } = Typography;
const PaymentBank = ({ data, className }: { data: any; className?: any }) => {
  const dataRender = [
    {
      title: 'Name',
      value: data.accountName,
    },
    {
      title: 'Bank Account Number',
      value: data.userId,
    },
    {
      title: 'Bank Branch',
      value: 'N/A',
    },
    {
      title: 'Bank Name',
      value: data.name,
    },
    {
      title: 'Note',
      value: data.note,
      notShowCopy: true,
    },
  ];
  return (
    <div className={cx('payment-bank', className)}>
      {dataRender.map((item, idx) => (
        <Row key={idx} justify={'space-between'}>
          <div>{item.title}</div>
          <Paragraph copyable={item.notShowCopy ? false : { text: item.value }}>{item.value}</Paragraph>
        </Row>
      ))}
    </div>
  );
};

export default PaymentBank;
