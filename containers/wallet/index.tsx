import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getWalletApi } from 'services/buy';
import { columns } from './columns';
import { useModal } from 'hooks/useModal';
import ModalWithdrawToken from './ModalWithdrawToken';
import showMessage from '@components//Message';
import TYPE_CONSTANTS from 'constants/type';
import { useApplicationContext } from 'contexts/ApplicationContext';

const Wallet = () => {
  const [data, setData] = useState<any>([]);
  const { visible, onOpenModal, onCloseModal } = useModal();
  const { appChainId } = useApplicationContext();
  console.log('appChainId', appChainId);
  const fetchWallet = async () => {
    const res = await getWalletApi({ chainId: Number(appChainId) });
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    if (appChainId) {
      fetchWallet();
    }
  }, [appChainId]);

  const callbackSuccess = () => {
    onCloseModal();
    showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Withdrawing token');
  };

  return (
    <div className="p2p-page">
      <div className="flex justify-between">
        <div className="title mb-8">My Wallet</div>
        <Button className="btn-primary" onClick={() => onOpenModal()}>
          Withdraw token
        </Button>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 900 }} />
      {visible && (
        <ModalWithdrawToken
          visible={visible}
          onClose={onCloseModal}
          callbackSuccess={callbackSuccess}
          listWalletData={data}
        />
      )}
    </div>
  );
};

export default Wallet;
