import { GetServerSideProps } from 'next';

import PublicLayout from '@components//Layout/Public';

import RegisterContainer from 'containers/register';
import withServerSideProps from 'hoc/withServerSideProps';
import { ReactElement } from 'react';

function Register() {
  return (
    <PublicLayout>
      <RegisterContainer />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default Register;
