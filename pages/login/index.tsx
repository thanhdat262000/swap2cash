import PublicLayout from '@components//Layout/Public';

import LoginContainer from 'containers/login';
import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

function Login() {
  return (
    <PublicLayout>
      <LoginContainer />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default Login;
