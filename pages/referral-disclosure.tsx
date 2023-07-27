/* eslint-disable react/no-unescaped-entities */
import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

function ReferralDisclosure() {
  return (
    <PublicLayout>
      <div className="blog-detail page-normal">
        <h1 className="blog-detail__title page-normal__title mt-[0px]">REFERRAL AGREEMENT DISCLOSURE</h1>
        <div className="page-normal__content">
          <span className="page-normal__content__text">
            This referral statement advises you of the existence of a referral arrangement between Swap2Cash,Inc. (S2C)
            and the person whose referral link you clicked to enter the S2C Platform, who is also a client of S2C
            (Referral Partner).
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            You are opening an account on the S2C Platform operated by S2C, which allows you to buy, sell and hold
            crypto assets. S2C is authorized to operate a self-directed crypto asset trading platform for Canadian
            investors under Terms and Conditions of Registration issued by the Ontario Securities Commission. Your
            relationship with S2C is described in the S2C User Agreement. All fees and compensation charged by S2C to
            you are set out on the website of the S2C Platform and incorporated into the S2C Terms of Service.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            S2C will pay Referral Partner a one-time referral fee of C$25 in consideration for referring you to the S2C
            Platform once an initial deposit of the equivalent of C$100 has been made. Referral Partner is not involved
            in any way in the provision of services to you on the S2C Platform.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            The possibility of a conflict of interest may arise in any paid referral arrangement where someone has a
            financial interest in introducing you to a service provider. In this case, Referral Partner is receiving a
            referral fee from S2C, and that fee may have impacted Referral Partner’s decision to refer you to the S2C
            Platform.
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
