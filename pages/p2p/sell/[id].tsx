import PublicLayout from '@components//Layout/Public';
import SellDetail from 'containers/sell-detail';
import { ReactElement } from 'react';

function SellDetailPage() {
  return <SellDetail />;
}

SellDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SellDetailPage;
