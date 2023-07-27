import PublicLayout from '@components//Layout/Public';
import Wallet from 'containers/wallet';
import { ReactElement } from 'react';

function WalletPage() {
  return <Wallet />;
}

WalletPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default WalletPage;
