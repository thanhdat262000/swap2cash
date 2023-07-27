import { Button, Radio, Row, Space, Statistic, Steps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { buyerCancelPayApi, confirmPayApi, fetchBuyDetailApi } from 'services/buy';
import OrderInfo from '../trade/OrderInfo';
import PaymentBank from '../trade/PaymentBank';
import { TRADE_STATUS } from 'constants/trade';
import { getCurrentBuyStep } from './utils';
import { useModal } from 'hooks/useModal';
import ModalConfirm from '@components//Modal/ModalConfirm';
import { getPaymentType } from 'utils/trade';

const { Countdown } = Statistic;

const BuyDetail = () => {
  const { query } = useRouter();
  const id = query.id;
  const [data, setData] = useState<any>();
  const [paymentId, setPaymentId] = useState();
  const { visible, onOpenModal, onCloseModal } = useModal();

  const isWatingConfirm = data?.status === TRADE_STATUS.WAITING_TO_PAYMENT;

  const fetchBuyDetail = async () => {
    const res = await fetchBuyDetailApi(id);
    if (res) {
      setData(res);
    }
  };

  const handleCompleted = async () => {
    if (paymentId) {
      const res = await confirmPayApi({
        id,
        paymentId,
      });
      if (res) {
        setData({ ...data, status: TRADE_STATUS.BUYER_CONFIRM_PAY });
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchBuyDetail();
    }
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      const res = await buyerCancelPayApi(id as string);
      console.log('res', res);
      if (res) {
        fetchBuyDetail;
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className="order-detail">
      <Row justify={'space-between'}>
        <div className="order-detail__title mb-4">Buy {data.putOnSale.currency.name}</div>
        {data.status === TRADE_STATUS.WAITING_TO_PAYMENT && (
          <div className="title order-detail__title__countdown">
            {/* <Countdown
              date={new Date(data.updatedAt).getTime() + 30 * 60 * 1000}
              zeroPadTime={2}
              renderer={({ minutes, seconds }: any) => {
                return <span>{`${minutes}:${seconds}`}</span>;
              }}
            /> */}
            <Countdown
              value={new Date(data.updatedAt).getTime() + 30 * 60 * 1000}
              format="mm:ss"
              // onFinish={() => setIsResendDisabled(false)}
              // className=" !text-stone-400"
            />
          </div>
        )}
        {/* <div>2023-05-07 16:02:41 1655136052981952512(Copy)</div> */}
      </Row>
      <div className="order-detail-content">
        <div>Complete Your Payment Within:</div>
        <div>
          Please complete payment within the allowed timeframe. After making payment, please click the Payment Completed
          button below. Note: The order will be automatically canceled if the button is not clicked by the deadline.
        </div>
        TIME
        <Steps
          className="order-status mt-4"
          size="small"
          current={getCurrentBuyStep(data.status)}
          items={[
            {
              title: 'Complete Your Payment',
            },
            {
              title: 'Coin Release in Progress',
            },
            {
              title: 'Transaction Completed',
            },
          ]}
        />
        <OrderInfo data={data} />
        <div className="order-payment mt-4">
          <div>Payment Methods Accepted by the Seller</div>
          <div>
            Please select a payment method and visit the site of the bank or the payment service of your choosing to
            complete the payment.
          </div>
          <div className="order-payment-warning mt-4">
            {`1. Please use NAME when making payment.\n2. Make sure not to remark sensitive words such as "BTC/USDT purchase" when transferring fiat, otherwise the transfer may fail.`}
          </div>
          <div className="mt-4">
            <Radio.Group
              onChange={(e) => {
                setPaymentId(e.target.value);
              }}
            >
              <Space direction="vertical">
                {data.putOnSale.listPaymentAccept.map((payment: any, idx: number) => (
                  <div key={idx}>
                    <Radio className="order-payment-item" value={payment.id}>
                      {getPaymentType(payment.type)}
                    </Radio>
                    <PaymentBank className={'ml-6'} data={payment} />
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </div>
          {isWatingConfirm && (
            <div className="order-payment-actions mt-8 mb-8">
              <Button disabled={!paymentId} onClick={handleCompleted}>
                Payment Completed
              </Button>
              <Button className="btn-cancel" onClick={onOpenModal}>
                Cancel Order
              </Button>
            </div>
          )}
          <ModalConfirm
            title="Cancel Order"
            description="Do you want to cancel this order?"
            visible={visible}
            onClose={onCloseModal}
            onConfirm={handleCancelOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyDetail;
