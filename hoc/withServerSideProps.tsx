import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Params } from 'next/dist/server/router';
import { END } from 'redux-saga';
import { wrapper } from 'redux/configStore';
import { getStoreConfigApi } from 'services/config/config';
import handleServerSide from 'utils/handleServerSide';
import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies';

const withServerSideProps = (getServerSidePropsCallback: any, needCtx?: boolean) => {
  return wrapper.getServerSideProps((store) => async (ctx: any) => {
    const { locale }: Params = ctx;
    let dataConfig;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/store-config`);
      dataConfig = await res.json();
    } catch (e) {
      console.log('e', e);
    }
    console.log('dataConfig from with serverside', dataConfig);

    nookies.set(ctx, 'dataConfig', JSON.stringify(dataConfig));

    // return {
    //   props: {
    //     dataConfig: '',
    //   },
    // };

    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

    const { redirect } = await handleServerSide.handleRedirectServerSide();
    const props = await handleServerSide.handleGetPropsServerSide();

    return await getServerSidePropsCallback({
      props: {
        ...props,
        ...(await serverSideTranslations(locale, ['common'])),
      },
      ...(redirect ? { redirect } : {}),
      ...(needCtx ? { ctx } : {}),
    });
  });
};

export default withServerSideProps;
