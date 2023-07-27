import { Col, Divider, Row } from 'antd';
import { formatCommaNumber } from 'utils';

const BuyInfo = ({ data }: { data: any }) => {
  const { rate, avaiable, crypto, fiat, max, min } = data;
  const name = data.userName || `${data.user.firstName} ${data.user.lastName}`;
  return (
    <div className="modal-buy-info">
      <div className="user-profile">
        <Row gutter={16} align={'middle'}>
          <Col className="modal-buy-info__avt">
            <div>{name.charAt(0)}</div>
          </Col>
          <Col>
            <div className="modal-buy-info__name">{name}</div>
          </Col>
        </Row>
      </div>
      <Divider />
      <Row className="modal-buy-info-item" justify={'space-between'}>
        <div>Price</div>
        <div className="modal-buy-info__price">
          {formatCommaNumber(rate)} {fiat}
        </div>
      </Row>
      <Row className="modal-buy-info-item" justify={'space-between'}>
        <div>Available</div>
        <div>
          {formatCommaNumber(avaiable)} {crypto}
        </div>
      </Row>
      {/* <Row className="modal-buy-info-item" justify={'space-between'}>
        <div>Limits</div>
        <div>
          {formatCommaNumber(min)} ~ {formatCommaNumber(max)} {fiat}
        </div>
      </Row> */}
      <Row className="modal-buy-info-item" justify={'space-between'}>
        <div>Payment Duration</div>
        <div>30 Minute(s)</div>
      </Row>
      <div className="modal-buy-info-item__payment">Bank Transfer</div>
    </div>
  );
};

export default BuyInfo;
