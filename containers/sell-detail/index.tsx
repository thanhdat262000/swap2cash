import { Button, Row, Steps, Tabs } from 'antd';
import { TRADE_STATUS } from 'constants/trade';
import OrderInfo from 'containers/trade/OrderInfo';
import PaymentBank from 'containers/trade/PaymentBank';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchSellDetailApi, sellerConfirmApi } from 'services/buy';
import { getPaymentType } from 'utils/trade';
import { getCurrentSellStep } from './utils';

const SellDetail = () => {
  const { query } = useRouter();
  const id = query.id;
  const [data, setData] = useState<any>();

  const isDone = data?.status === TRADE_STATUS.SELLER_CONFIRM_PAY;

  const fetchBuyDetail = async () => {
    const res = await fetchSellDetailApi(id);
    if (res) {
      setData(res);
    }
  };

  const handleCompleted = async () => {
    const res = await sellerConfirmApi({
      id,
    });
    if (res) {
      setData({ ...data, status: TRADE_STATUS.SELLER_CONFIRM_PAY });
    }
  };

  useEffect(() => {
    if (id) {
      fetchBuyDetail();
    }
  }, [id]);

  if (!data) {
    return <></>;
  }
  console.log('data', data);

  return (
    <div className="order-detail">
      <Row>
        <div className="order-detail__title mb-4">Sell {data.putOnSale.currency.name}</div>
      </Row>
      <div className="order-detail-content">
        <Steps
          className="order-status mt-4"
          size="small"
          current={getCurrentSellStep(data.status)}
          items={[
            {
              title: 'Pending Couterparty Payment',
            },
            {
              title: 'Coin Release in Progress',
            },
            {
              title: 'Transaction Completed',
            },
          ]}
        />
        <OrderInfo data={data} isSeller />
        <div className="mt-8">Payment Method</div>
        <Tabs
          items={data.putOnSale.listPaymentAccept.map((item: any, idx: number) => ({
            key: item.id,
            label: `${idx + 1} ${getPaymentType(item.type)}`,
            children: <PaymentBank data={item} />,
          }))}
        />
        {!isDone && (
          <div className="order-payment mt-4">
            <div className="order-payment-actions mt-8 mb-8">
              <Button onClick={handleCompleted} className="btn-primary px-8">
                Release Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellDetail;
