import { GetServerSideProps } from 'next';

import PublicLayout from '@components//Layout/Public';

import RegisterContainer from 'containers/register';
import withServerSideProps from 'hoc/withServerSideProps';
import { ReactElement } from 'react';
import ForgotPasswordContainer from 'containers/forgot-password';

function ForgotPassword() {
  return (
    <PublicLayout>
      <ForgotPasswordContainer />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default ForgotPassword;
