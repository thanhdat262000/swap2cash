import { useWeb3React } from '@web3-react/core';
import { walletConnect } from 'connectors';
import { METAMASK, SUPPORTED_CHAIN_IDS, WALLET_CONNECT } from 'connectors/constants';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { FC, useEffect } from 'react';
import selectedConnection from 'redux/connection/selector';
import { handleSetConnectedWalletType, handleSetWrongNetwork } from 'redux/connection/slice';
import ModalConnectWallet from '../Modal/ModalConnectWallet';
import ModalWrongNetwork from '../Modal/ModalWrongNetwork';

const AppConnectWalletWrapper: FC<{
  children: any;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, appChainId } = useApplicationContext();

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const { chainId, account, active } = useWeb3React();
  const connectedWalletType = useAppSelector(selectedConnection.getConnectedWalletType);

  useEffect(() => {
    if (isAuthenticated && connectedWalletType && !active) {
      if (connectedWalletType === METAMASK) {
        setTimeout(() => {
          connectInjected();
        }, 700);
      }

      if (connectedWalletType === WALLET_CONNECT) {
        setTimeout(() => {
          connectWalletConnect();
        }, 700);
      }
    }
  }, [isAuthenticated, connectedWalletType, active]);

  useEffect((): any => {
    walletConnect.on('Web3ReactDeactivate', () => {
      // dispatch(logout());
    });

    return () => walletConnect.removeListener('Web3ReactDeactivate', () => console.log('Web3ReactDeactivate'));
  }, []);

  useEffect(() => {
    if (chainId && appChainId) {
      if (chainId !== appChainId) {
        dispatch(handleSetWrongNetwork(true));
      } else {
        dispatch(handleSetWrongNetwork(false));
      }
    }
  }, [chainId, appChainId]);

  return (
    <>
      {children}
      <ModalWrongNetwork />
      <ModalConnectWallet />
    </>
  );
};

export default AppConnectWalletWrapper;
