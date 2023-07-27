import PublicLayout from '@components//Layout/Public';
import BuyDetail from 'containers/buy-detail';
import { ReactElement } from 'react';

function TradeDetailPage() {
  return <BuyDetail />;
}

TradeDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default TradeDetailPage;
