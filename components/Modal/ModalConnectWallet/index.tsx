import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Typography, Spin, Button } from 'antd';
import Link from 'next/link';

import Modal from 'components/Modal';
import LoadingIcon from '@components//common/LoadingIcon';
import AppButton from 'components/AppButton';

import {
  handleSetConnectedWalletType,
  handleSetConnectModal,
  handleSetLoadingMetamask,
  handleSetWrongNetwork,
} from 'redux/connection/slice';
import { getErrorConnectMessage } from 'connectors';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { METAMASK, METAMASK_DEEPLINK, WALLET_CONNECT } from 'connectors/constants';
import selectedConnection from 'redux/connection/selector';

import iconMetaMask from 'public/svg/logo_metamask.svg';
import iconWalletConnect from 'public/svg/icon_walletconnect.svg';
import { useConnectWallet } from 'hooks/useConnectWallet';

declare let window: any;

const { Paragraph } = Typography;

const ModalConnectWallet = () => {
  const { t } = useTranslation();
  const { active, deactivate, account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { isShowConnectModal } = useAppSelector(selectedConnection.getConnection);

  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));

  const [isShowMetaMask, setIsShowMetaMask] = useState(false);
  const [connectedWalletType, setConnectedWalletType] = useState('');

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  const handleConnectMetamask = () => {
    connectInjected(() => setIsShowMetaMask(true), setConnectedWalletType(METAMASK));

    if (window.ethereum) {
      handleHideModalConnectWallet();
    }
  };

  const handleConnectWallet = () => {
    handleHideModalConnectWallet();

    connectWalletConnect({
      failed: (err) => {
        dispatch(handleSetLoadingMetamask(false));
        getErrorConnectMessage(err, deactivate);
        dispatch(handleSetWrongNetwork(true));
      },
    });

    setConnectedWalletType(WALLET_CONNECT);
  };

  useEffect(() => {
    if (active && account && connectedWalletType) {
      dispatch(handleSetConnectedWalletType(connectedWalletType));
    }
  }, [connectedWalletType, active, account]);

  const renderConnectWallet = () => (
    <div className="flex flex-col items-center">
      <h4 className=" text-xl font-bold mb-3">Connect Your Wallet</h4>
      <p className="mb-2">Choose your wallet to continue.</p>
      <div className="flex w-full justify-center space-x-4">
        <div
          onClick={handleConnectMetamask}
          className=" border border-solid border-primary rounded-lg p-4 cursor-pointer flex flex-col items-center flex-1 hover:bg-neutral"
        >
          <Image src={iconMetaMask} alt="Metamask" width={64} height={64} />
          <span>Metamask</span>
        </div>
        <div
          onClick={handleConnectWallet}
          className="border border-solid border-primary rounded-lg p-4 cursor-pointer flex flex-col items-center flex-1 hover:bg-neutral"
        >
          <Image src={iconWalletConnect} alt="Metamask" width={64} height={64} />
          <span>Wallet Connect</span>
        </div>
      </div>
    </div>
  );

  const renderNoMetamask = () => (
    <div className="popup_metamask">
      {connectedWalletType === WALLET_CONNECT ? (
        <div className={'metamask_notfound'}>
          <p>Metamask not found</p>
          <Image layout="fill" src={iconWalletConnect} alt="" />
          <Link href="">
            <a href="" className="link" onClick={handleConnectWallet} rel="noreferrer">
              {t('header.walletconnect_reconnect')}
            </a>
          </Link>
        </div>
      ) : isEthereum ? (
        <div className={'connect_metamask'}>
          <Paragraph className="title">{t('header.connecting_title')}</Paragraph>
          <Image layout="fill" src={iconMetaMask} alt="" />
          <Spin size={'large'} indicator={<LoadingIcon />} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className=" text-center text-xl font-bold mb-2">Metamask not found</h3>
          <Image width={565} height={114} src={iconMetaMask} alt="" />
          <a target="_blank" href={METAMASK_DEEPLINK} rel="noreferrer" className="mt-4">
            <Button className="btn-secondary m-auto">Install Metamask</Button>
          </a>
        </div>
      )}
    </div>
  );

  return (
    <Modal visible={isShowConnectModal} onClose={handleHideModalConnectWallet} showCloseIcon={true} width={420}>
      {!isShowMetaMask ? renderConnectWallet() : renderNoMetamask()}
    </Modal>
  );
};

export default ModalConnectWallet;
