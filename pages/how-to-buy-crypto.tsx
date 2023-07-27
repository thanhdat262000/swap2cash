/* eslint-disable react/no-unescaped-entities */
import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';

function ReferralDisclosure() {
  return (
    <PublicLayout>
      <div className="blog-detail page-normal">
        <h1 className="blog-detail__title page-normal__title mt-[0px]">HOW TO BUY CRYPTO</h1>
        <div className="page-normal__content">
          <span className="page-normal__content__text">
            NO FEES, NO MARKUP. All crypto listed on this platform are listed at the actual cost.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            Before you can buy crypto, signup and get a free wallet created for you and your purchases are free, then
            follow these 4 short steps to complete the transaction.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">1. Search the listing for the crypto you need.</span>
          <br />
          <br />
          <span className="page-normal__content__text">2. Select the payment method that suits you best.</span>
          <br />
          <br />
          <span className="page-normal__content__text">
            3. Send the Funds to the seller’s account and retain the receipt.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            4. Let us know that you completed the transaction with the transaction info.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            The next step is for us to notify the seller for them to release the crypto to you.
          </span>
          <br />
          <br />
        </div>
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default ReferralDisclosure;
