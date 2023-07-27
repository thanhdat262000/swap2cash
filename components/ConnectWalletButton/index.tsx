import { Button } from 'antd';
import { useAppDispatch } from 'hooks/useStore';
import { handleSetConnectModal } from 'redux/connection/slice';
import cx from 'classnames';

const ConnectWalletButton = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  const handleShowConnectModal = () => dispatch(handleSetConnectModal(true));

  return (
    <Button className={cx('btn-secondary', className)} onClick={handleShowConnectModal}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
