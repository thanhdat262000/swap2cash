/* eslint-disable react/no-unescaped-entities */
import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';

function HowToSell() {
  return (
    <PublicLayout>
      <div className="blog-detail page-normal">
        <h1 className="blog-detail__title page-normal__title mt-[0px]">HOW TO SELL CRYPTO</h1>
        <div className="page-normal__content">To be continue...</div>
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default HowToSell;
