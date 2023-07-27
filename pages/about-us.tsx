/* eslint-disable react/no-unescaped-entities */
import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

function AboutUs() {
  return (
    <PublicLayout>
      <div className="blog-detail page-normal">
        <h1 className="blog-detail__title page-normal__title mt-[0px]">About Us</h1>
        <div className="page-normal__content">
          <span className="page-normal__content__text">
            {`Welcome to Swap2Cash, the world's leading cryptocurrency exchange. We offer a wide range of features and
          services to make it easy for you to buy, sell, and swap cryptocurrencies.`}
          </span>
          <br />
          <br />

          <span className="page-normal__content__text">
            {`We were founded by a team of experienced cryptocurrency enthusiasts. Our mission is to make it easy for everyone to participate in the cryptocurrency revolution.`}
          </span>
          <span className="page-normal__content__text">{`We offer a variety of features and services, including:`}</span>
          <br />
          <br />

          <ul className="page-normal__content__text">
            <li>A user-friendly platform that makes it easy to buy, sell, rade and earn cryptocurrencies</li>
            <li>A wide range of supported cryptocurrencies</li>
            <li>The most competitive fees</li>
            <li>A secure and reliable platform</li>
            <li>A team of experienced and knowledgeable support staff</li>
          </ul>
          <br />
          <span className="page-normal__content__text">{`We are committed to providing our users with the best possible experience. We are constantly working to improve our platform and services.`}</span>
          <br />
          <br />
          <span className="page-normal__content__text">{`If you are looking for a safe and reliable place to buy, sell,trade or earn cryptocurrencies, then Swap2Cash is the perfect choice for you.`}</span>
          <br />
          <br />
          <b>Why Choose Swap2Cash?</b>
          <br />
          <br />
          <span className="page-normal__content__text">There are many reasons why you should choose Swap2Cash:</span>
          <br />
          <br />
          <ul className="page-normal__content__text">
            <li>We are the world's leading P2P cryptocurrency exchange.</li>
            <li>We offer a wide range of features and services.</li>
            <li>We are committed to providing our users with the best possible experience.</li>
            <li>We are constantly working to improve our platform and services</li>
            <li>We are a safe and reliable platform.</li>
            <li>We have a team of experienced and knowledgeable support staff.</li>
          </ul>
          <br />
          <br />
          <b>How to Get Started</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            To get started with Swap2Cash, simply create an account. Once you have created your account, you are
            automatically enrolled in our referral program where you can earn crypto when someone uses your referral
            link. You can start buying, selling, and trading cryptocurrencies.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            If you want to sell your crypto, just list your crypto and choose how you want the buyer to send your funds.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">
            We also offer a variety of educational resources to help you learn about cryptocurrencies.
          </span>
          <br />
          <br />
          <b>Contact Us</b>
          <br />
          <br />
          <span className="page-normal__content__text">
            If you have any questions or problems, please contact our support team. Our live chat is available 24/7 to
            help you.
          </span>
          <br />
          <br />
          <span className="page-normal__content__text">You can also contact us:</span>
          <br />
          <br />
          <span className="page-normal__content__text">By email at support@swap2cash.com</span>
          <br />
          <br />
          <span className="page-normal__content__text">By phone at: 302-256-5566</span>
          <br />
          <br />
          <span className="page-normal__content__text">We look forward to hearing from you!</span>
        </div>
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

// AboutUs.getLayout = function getLayout(page: ReactElement) {
//   return <PublicLayout>{page}</PublicLayout>;
// };

export default AboutUs;
