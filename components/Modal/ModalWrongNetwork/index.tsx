import { useEffect, FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Spin } from 'antd';

import LoadingIcon from '@components//common/LoadingIcon';
import Modal from '..';

import selectedConnection from 'redux/connection/selector';

import { METAMASK } from 'connectors/constants';
import { setupNetwork } from 'utils/wallet';
import { useAppSelector } from 'hooks/useStore';
import { useApplicationContext } from 'contexts/ApplicationContext';

const { Paragraph } = Typography;

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = ({}) => {
  const { t } = useTranslation();
  const { appChainId } = useApplicationContext();

  const { isWrongNetwork } = useAppSelector(selectedConnection.getConnection);
  const connectedWalletType = useAppSelector(selectedConnection.getConnectedWalletType);

  //If website must connect to 1 specific chain, set this to that chain id

  useEffect(() => {
    if (isWrongNetwork) {
      const switchNetwork = async () => {
        try {
          if (connectedWalletType === METAMASK && appChainId) {
            await setupNetwork(connectedWalletType, appChainId);
          }
        } catch (error: any) {}
      };

      switchNetwork();
    }
  }, [connectedWalletType, isWrongNetwork, appChainId]);

  return (
    <Modal visible={isWrongNetwork} maskClosable={false} showCloseIcon={false} destroyOnClose width={400}>
      <div className="flex flex-col items-center space-y-4">
        <Spin indicator={<LoadingIcon />} />
        <h4 className="text-lg font-bold text-center">Wrong network</h4>
        <span>Please switch your network to continue</span>
      </div>
    </Modal>
  );
};

export default ModalWrongNetwork;
