import { Col, Row } from 'antd';
import ModalComponent from '..';
import BuyInfo from './BuyInfo';
import BuyInput from './BuyInput';

interface IModalCreateSellOrderProps {
  visible: boolean;
  onClose: () => void;
  data: any;
  onSubmit: any;
}

const ModalBuy = ({ visible, onClose, data, onSubmit }: IModalCreateSellOrderProps) => {
  return (
    <ModalComponent wrapClassName="modal-buy" visible={visible} width={732} onClose={onClose} showCloseIcon={false}>
      <Row>
        <Col span={11}>
          <BuyInfo data={data} />
        </Col>
        <Col span={13}>
          <BuyInput data={data} onClose={onClose} onSubmit={onSubmit} />
        </Col>
      </Row>
    </ModalComponent>
  );
};

export default ModalBuy;
