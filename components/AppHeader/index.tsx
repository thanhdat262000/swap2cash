import { Avatar, Button, ConfigProvider, Drawer, Dropdown, Select } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '../../public/images/logo.png';
import Image from 'next/image';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogOut, BiUser, BiMenu } from 'react-icons/bi';
import { useWeb3React } from '@web3-react/core';
import ConnectWalletButton from '../ConnectWalletButton';
import { formatAddress } from 'utils/wallet';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'hooks/useStore';
import { handleSetConnectedWalletType } from 'redux/connection/slice';
import { SelectInput } from '../FormItem';
import { URL } from 'constants/routes';
import { DEFAULT_CHAIN } from 'connectors/constants';
import { CHAINID_KEY } from 'constants/type';
import { CHAINID_OPTIONS } from 'constants/chainOptions';
import DropdownHeader from './DropdownHeader';

const Header = () => {
  const { isAuthenticated, handleLogout, appChainId, handleSetChainId } = useApplicationContext();
  const { account, active } = useWeb3React();
  const { disConnect } = useConnectWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appConfig } = useApplicationContext();
  const { logo } = appConfig || {};

  const handleDisconnect = () => {
    dispatch(handleSetConnectedWalletType(null));
    disConnect();
  };

  useEffect(() => {
    const chainIdLocalStorage = localStorage.getItem(CHAINID_KEY);
    if (!chainIdLocalStorage) {
      handleSetChainId(DEFAULT_CHAIN);
    }
  }, [appChainId]);

  const accountMenuItems = [
    {
      key: '1',
      label: (
        <div className="flex items-center space-x-2">
          <Link href={'/profile'}>
            <a className="a-not-show">
              <div className="flex items-center space-x-2">
                <BiUser size={24} />
                <span className=" font-semibold">Profile</span>
              </div>
            </a>
          </Link>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center space-x-2">
          <BiLogOut size={24} />
          <span onClick={handleLogout} className=" font-semibold">
            Logout
          </span>
        </div>
      ),
    },
  ];

  const walletItems = [
    {
      key: '1',
      label: (
        <div className="flex items-center space-x-2">
          <BiLogOut size={24} />
          <span onClick={handleDisconnect} className=" font-semibold">
            Disconnect
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-20 border-b border-divider sticky top-0 z-10 flex justify-center items-center header">
      <div className="layout h-full flex justify-between items-center w-100">
        <div className="relative h-16">
          <Link href="/">
            <img src={logo || Logo} alt="Logo" className="h-full cursor-pointer" />
          </Link>
        </div>
        <div className="md:block hidden flex-1 pl-[80px]">
          <DropdownHeader
            text="BUYING"
            listItem={[
              {
                name: 'How It Works',
                link: URL.HOW_TO_BUY_CRYPTO,
              },
              {
                name: 'Buy Crypto',
                link: URL.P2P,
              },
            ]}
          />
          <DropdownHeader
            text="SELLING"
            listItem={[
              {
                name: 'How It Works',
                link: URL.HOW_TO_SELL,
              },
              {
                name: 'Your Profile',
                link: URL.WALLET,
              },
            ]}
          />
          <DropdownHeader
            text="SWAPPING"
            listItem={[
              {
                name: 'How It Works',
                link: URL.HOW_TO_SWAP,
              },
              {
                name: 'Swap Crypto',
                link: URL.SWAP_TOKEN,
              },
            ]}
          />
          <DropdownHeader
            text="LEARN"
            listItem={[
              {
                name: 'About Us',
                link: URL.ABOUT_US,
              },
              {
                name: 'Contact Us',
                link: URL.RELATION_DISCLOSURE,
              },
              {
                name: 'FAQs',
                link: URL.FAQs,
              },
              {
                name: 'NEWS',
                link: URL.NEWS,
              },
            ]}
          />
          <DropdownHeader
            text="EARN WITH US"
            listItem={[
              {
                name: 'How Referral Works',
                link: URL.HOW_REFERRAL_WORK,
              },
              {
                name: 'Referral Report',
                link: URL.REFERRAL_REPORT,
              },
            ]}
          />
        </div>
        <div className="flex items-center justify-end space-x-4">
          {/* <Select
            options={CHAINID_OPTIONS.map((option: any) => ({ ...option, label: option.name }))}
            className="!w-[9rem] !rounded-3xl"
            value={appChainId}
            onChange={handleSetChainId}
          /> */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {!account && <ConnectWalletButton className="md:flex hidden" />}
              {account && (
                <Dropdown menu={{ items: walletItems }} trigger={['click']} className="md:flex hidden">
                  <Button className="btn-secondary">{formatAddress(account)}</Button>
                </Dropdown>
              )}
              <Dropdown
                menu={{ items: accountMenuItems }}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="dropdown-default"
              >
                <div className=" w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 cursor-pointer">
                  <FaUserAlt />
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="md:flex hidden items-center space-x-4">
              <Link href="/login">
                <Button className="btn-secondary px-8">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="btn-primary px-8">Sign up</Button>
              </Link>
            </div>
          )}
          <BiMenu className="md:hidden block cursor-pointer" size={24} onClick={() => setIsMenuOpen(true)} />
        </div>
      </div>
      <Drawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} title="Menu">
        <div className="flex flex-col items-start space-y-4">
          {!isAuthenticated ? (
            <div className="flex items-center w-full gap-4 pb-6 border-b border-solid border-divider">
              <Link href="/login">
                <Button onClick={() => setIsMenuOpen(false)} className="btn-secondary px-8 basis-1/2">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button onClick={() => setIsMenuOpen(false)} className="btn-primary px-8 basis-1/2">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="border-b border-solid border-divider pb-6 w-full">
              {!account && <ConnectWalletButton className="" />}
              {account && (
                <Button className="btn-secondary space-x-2" onClick={handleDisconnect}>
                  <BiLogOut size={24} />
                  <span>{formatAddress(account)}</span>
                </Button>
              )}
            </div>
          )}

          <div className="flex flex-col items-start space-y-2">
            <Link href={URL.HOW_TO_BUY_CRYPTO}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                How to buy crypto
              </span>
            </Link>
            <Link href={URL.P2P}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                Buy Crypto
              </span>
            </Link>
            <Link href={URL.WALLET}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                Your Profile
              </span>
            </Link>
            <Link href={URL.SWAP_TOKEN}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                Swap Crypto
              </span>
            </Link>
            <Link href={URL.ABOUT_US}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                About Us
              </span>
            </Link>
            <Link href={URL.RELATION_DISCLOSURE}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                Contact Us
              </span>
            </Link>
            <Link href={URL.FAQs}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                FAQs
              </span>
            </Link>
            <Link href={URL.NEWS}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                NEWS
              </span>
            </Link>
            <Link href={URL.HOW_REFERRAL_WORK}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                How Referral Works
              </span>
            </Link>
            <Link href={URL.REFERRAL_REPORT}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300"
              >
                Referral Report
              </span>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
