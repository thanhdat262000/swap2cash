import { Button, Select, Table } from 'antd';
import { useApplicationContext } from 'contexts/ApplicationContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCurrencyApi } from 'services/currency';
import { getSellOrderApi } from 'services/order';
import { referralColumns } from './columns';
import TYPE_CONSTANTS, { ORDER_STATUS, ORDER_TYPE, STATUS_BY_VALUE } from 'constants/type';
import { getReferralRewardApi } from 'services/auth';
import { useModal } from 'hooks/useModal';
import ModalWithdrawToken from 'containers/wallet/ModalWithdrawToken';
import showMessage from '@components//Message';
import ModalWithdrawReferral from './ModalWithdrawReferral';

const ReferralReward = () => {
  const { visible, onOpenModal, onCloseModal } = useModal();
  const { profile, isAuthenticated, appChainId } = useApplicationContext();
  const [listReferralReward, setListReferralReward] = useState([]);
  const [paramsSearch, setParamsSearch] = useState<any>({
    // currencyId: null,
    // type: ORDER_TYPE[0].value,
    // status: ORDER_STATUS[0].value,
  });

  useEffect(() => {
    const getListOrder = async () => {
      const params = {};
      const res = await getReferralRewardApi(params);
      if (res) setListReferralReward((res.data || []).map((item: any, index: number) => ({ ...item, no: index + 1 })));
    };
    if (isAuthenticated) {
      getListOrder();
    }
  }, [isAuthenticated, paramsSearch, appChainId]);

  const callbackSuccess = () => {
    onCloseModal();
  };

  return (
    <div>
      <div className="px-4 mb-2">
        <Button className="btn-primary" onClick={() => onOpenModal()}>
          Withdraw referral reward
        </Button>
      </div>
      <div className="flex flex-col items-start text-gray-400 px-4">
        <Table
          scroll={{ x: true }}
          columns={referralColumns}
          dataSource={listReferralReward}
          className="custom-table"
          bordered={false}
          key={'_id'}
        />
      </div>
      {visible && <ModalWithdrawReferral visible={visible} onClose={onCloseModal} callbackSuccess={callbackSuccess} />}
    </div>
  );
};

export default ReferralReward;
