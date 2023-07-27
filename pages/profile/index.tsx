import PublicLayout from '@components//Layout/Public';
import ProfileContainer from 'containers/profile';
import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';

import { ReactElement } from 'react';

function Profile() {
  return (
    <div className="flex justify-center">
      <ProfileContainer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Profile.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Profile;
