import { Avatar, Button, Tabs } from 'antd';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { useEffect, useState } from 'react';
import { getSellOrderApi } from 'services/order';
import Payment from './Payment';
import Order from './Order';
import { useRouter } from 'next/router';
import { PROFILE_TABS_KEYS } from 'constants/type';
import ModalChangePassword from '@components//Modal/ModalChangePassword';
import { URL } from 'constants/routes';
import { SIGN_UP_STEP } from 'containers/register';
import ReferralReward from './Referral Reward';
import { useModal } from 'hooks/useModal';
import ModalOTPChangePass from '@components//Modal/ModalOTP/ModalOTPChangePass';

const ProfileContainer = () => {
  const { profile, isAuthenticated } = useApplicationContext();
  const [listOrder, setListOrder] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const { visible: visibleModalOTP, onOpenModal: onOpenModalOTP, onCloseModal: onCloseModalOTP } = useModal();

  const router = useRouter();

  useEffect(() => {
    const getListOrder = async () => {
      const res = await getSellOrderApi();
      if (res) setListOrder(res.data);
    };
    if (isAuthenticated) {
      getListOrder();
    }
  }, [isAuthenticated]);

  const tabItems = [
    {
      key: 'payment',
      label: <span>Payment Method</span>,
      children: <Payment />,
    },
    {
      key: 'order',
      label: <span>Order</span>,
      children: <Order />,
    },
    {
      key: 'referral-reward',
      label: <span>Referral Reward</span>,
      children: <ReferralReward />,
    },
  ];

  const onChangeTab = (key: string) => {
    router.push({ pathname: router.pathname, query: { tab: key } });
  };

  return (
    <div className="layout pt-8">
      <div className="bg-white rounded-xl px-4 py-5 md:flex-row flex flex-col items-start md:items-center justify-between">
        <div className="flex item-start">
          <div className="items-center space-x-4 flex">
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} size={48}>
              {profile?.firstName.slice(0, 1)}
            </Avatar>
            <div className="flex flex-col">
              <div className="profile__referral">
                <div className="profile__referral__title">Full name:</div>
                <div>
                  {profile?.firstName} {profile?.lastName}
                </div>
              </div>
              <div className="profile__referral">
                <div className="profile__referral__title">Username:</div>
                <div>{profile?.userName}</div>
              </div>
              <div className="profile__referral">
                <div className="profile__referral__title">Phone:</div>
                <div>{profile?.phone}</div>
              </div>
              <div className="profile__referral">
                <div className="profile__referral__title">Email:</div>
                <div>{profile?.email}</div>
              </div>
              <div className="profile__referral">
                <div className="profile__referral__title">Referral link:</div>
                <div>
                  <a
                    href={`${process.env.NEXT_PUBLIC_DOMAIN}${URL.REGISTER}?referral=${profile?.userName}&step=${SIGN_UP_STEP.SIGN_UP}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline break-all"
                  >
                    {`${process.env.NEXT_PUBLIC_DOMAIN}${URL.REGISTER}?referral=${profile?.userName}&step=${SIGN_UP_STEP.SIGN_UP}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className="btn-primary mt-3 md:mt-0" onClick={onOpenModalOTP}>
          Change Password
        </Button>
      </div>
      <div className="bg-white rounded-xl px-4 py-5 mt-4">
        <Tabs
          items={tabItems}
          activeKey={(router.query?.tab as string) || PROFILE_TABS_KEYS.PAYMENT}
          onChange={onChangeTab}
        />
      </div>
      <ModalChangePassword visible={visible} onClose={() => setIsVisible(false)} />
      {visibleModalOTP && (
        <ModalOTPChangePass
          visible={visibleModalOTP}
          callbackSuccess={() => setIsVisible(true)}
          onClose={onCloseModalOTP}
        />
      )}
    </div>
  );
};

export default ProfileContainer;
