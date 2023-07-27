// @ts-nocheck
import { ReactElement, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { GetServerSideProps } from 'next';

import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import HomePage from '@components//pages/home/HomePage';
import { getStoreConfigApi } from 'services/config/config';
import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies';

function Home() {
  return (
    <PublicLayout>
      <div>
        <qc-price-ticker-widget
          mode="custom"
          top-coins="true"
          gainers-and-losers="true"
          bg="#FAFAFA"
          theme="light"
          currency="USD"
          class="price-ticker"
        ></qc-price-ticker-widget>

        <div className="flex justify-center">
          <HomePage />
        </div>
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

// export async function getServerSideProps() {
//   // Fetch data from your API
//   console.log('here');
//   const res = await fetch('https://api.example.com/data');
//   const data = await res.json();

//   // Pass the data as props to the component
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Home;
