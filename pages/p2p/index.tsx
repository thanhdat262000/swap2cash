import PublicLayout from '@components//Layout/Public';
import P2P from 'containers/p2p';
import { ReactElement } from 'react';

function P2PPage() {
  return <P2P />;
}

P2PPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default P2PPage;
