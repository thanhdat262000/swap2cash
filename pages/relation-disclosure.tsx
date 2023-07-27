/* eslint-disable react/no-unescaped-entities */
import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';

function RelationDisclosure() {
  return (
    <PublicLayout>
      <div className="blog-detail page-normal">
        <h1 className="blog-detail__title page-normal__title mt-[0px]">REFERRAL AGREEMENT DISCLOSURE</h1>
        <div className="page-normal__content">
          <b className="text-[18px]">1. PURPOSE</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            This document sets out important information concerning our relationship with you. It contains information
            about us, the services that we offer and your account with us. Other important information you need to know
            about your relationship with us is contained in the User Agreement that you entered into on our website.
          </span>
          <br />
          <br />
          <b className="text-[18px]">2. AN OVERVIEW OF S2C INC.</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            S2C Inc. is registered as a service provider in the United States Of America and other jurisdictions which
            permit S2C to operate a crypto asset trading platform on which customers can buy and sell cryptocurrencies
            from each other. S2C does not sell cryptocurrencies nor accept fiat currency for any goods or service.
          </span>
          <br />
          <br />
          <b className="text-[18px]">3. THE PRODUCTS AND SERVICES WE OFFER</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            The S2C Platform does not list crypto that are considered securities or derivatives under securities
            legislation in any juresdiction. Before listing a crypto on the S2C Platform, we perform a product
            assessment by reviewing publicly available information about the creation, governance and use of the crypto,
            the supply, demand, maturity, utility and liquidity of the crypto, material technical risks associated with
            the crypto and legal and regulatory risks associated with the crypto. The S2C Platform includes a Crypto
            Asset Statement for every listed crypto. We will update the Statement if there is a material change in the
            crypto, including a change in the risk profile or a determination made by a court or regulator that the
            crypto is a security or a derivative. If this happens, we will de-list the crypto and you will be required
            to sell it or withdraw it from the S2C Platform.
          </span>
          <br />
          <br />
          <b className="text-[18px]">4. COSTS ASSOCIATED WITH YOUR ACCOUNT</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            S2C does not charge commissions or other transaction fees for buying or selling on the S2C Platform or
            depositing assets to the S2C Platform. S2C charges a very small withdrawal fee for withdrawals. S2C also
            earns a spread on swaps. The spread charged by S2C covers the costs of the Crypto Custodian, our liquidity
            providers, and operational overhead. This fee structure is posted clearly on our website in multiple
            locations, displayed and agreed to when you complete a transaction and provided in a receipt for the
            transaction that is emailed to you.
          </span>
          <br />
          <br />
          <b className="text-[18px]">5. THE COSTS OF BUYING, HOLDING AND SELLING CRYPTO</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            Other than the spread and withdrawal fees described above, there are no costs directly paid by you
            associated with buying or selling or swapping crypto on the S2C Platform.
          </span>
          <br />
          <br />
          <b className="text-[18px]">6. BENEFITS RECEIVED BY US</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            When you buy, sell or list crypto on the S2C Platform, we earn nothing, we only earn a small withdrawal fee
            when crypto is sent off of the S2C platform.
          </span>
          <br />
          <br />
          <b className="text-[18px]">7. COMPLAINT RESOLUTION</b>
          <br />
          <br />
          <b>Filing a complaint with us</b>
          <br />
          <br />

          <span className="page-normal__content__text">
            If you have a complaint about our services or a product, contact us: support@swap2cash.com.
          </span>
          <br />
          <span className="page-normal__content__text">
            You may want to consider using a method other than email for sensitive information.
          </span>
          <br />
          <span className="page-normal__content__text">Tell us:</span>
          <br />
          <ul>
            <li>What went wrong.</li>
            <li>When it happened.</li>
            <li>What you expect.</li>
          </ul>
          <span className="page-normal__content__text">To help us resolve your complaint sooner:</span>
          <br />
          <ul>
            <li>Make your complaint as soon as possible.</li>
            <li>Reply promptly if we ask you for more information.</li>
            <li>Keep copies of all relevant documents and notes of conversations with us.</li>
          </ul>
          <br />
          <span className="page-normal__content__text">
            We will acknowledge your complaint in writing, as soon as possible, typically within 5 business days of
            receiving your complaint with a summary of the complaint. The results of our investigation and our decision
            to make an offer to resolve the complaint or deny it, and an explanation of our decision.
          </span>
          <br />
          <br />
        </div>
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default RelationDisclosure;
