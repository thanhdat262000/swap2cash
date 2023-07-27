import { Col, Row } from 'antd';
import cx from 'classnames';
import { formatCommaNumber } from 'utils';

const OrderInfo = ({ data, isSeller }: { data: any; isSeller?: boolean }) => {
  const orderInfoData: Array<{ title: string; data: any; suffix: string; className?: string }> = [
    {
      title: isSeller ? 'Receive' : 'Pay',
      data: data.buyFiatAmount,
      suffix: data.putOnSale.fiatCurrency.name,
      className: 'green',
    },
    {
      title: 'Price',
      data: data.exchangeRate,
      suffix: data.putOnSale.fiatCurrency.name,
    },
    {
      title: 'Total Quantity',
      data: data.buyAmount,
      suffix: data.putOnSale.currency.name,
    },
  ];
  return (
    <>
      <div className="mt-8">Order Info</div>
      <Row className="order-info mt-2" justify={'space-between'}>
        {orderInfoData.map(({ title, data, suffix, className }, idx) => (
          <Col key={idx}>
            <div>{title}</div>
            <div className={cx('order-info__item-val mt-1', className)}>
              {formatCommaNumber(data)} {suffix}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default OrderInfo;
