import PublicLayout from '@components//Layout/Public';
import SwapToken from 'containers/swap-token/SwapToken';
import { ReactElement } from 'react';

function SwapTokenPage() {
  return <SwapToken />;
}

SwapTokenPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SwapTokenPage;
