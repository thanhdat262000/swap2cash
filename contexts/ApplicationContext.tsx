import { useWeb3React } from '@web3-react/core';
import { ETH_CHAIN_ID } from 'connectors/constants';
import { URL } from 'constants/routes';
import { CHAINID_KEY } from 'constants/type';
import { SIGN_UP_STEP } from 'containers/register';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ACCESS_TOKEN_KEY } from 'services/api';
import { getProfileApi, loginApi } from 'services/auth';
import { v4 as uuidv4 } from 'uuid';

export const ApplicationContext = createContext<any>({});

export const useApplicationContext = () => useContext(ApplicationContext);

const ApplicationProvider = ({ children }: { children: any }) => {
  const { chainId } = useWeb3React();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [refreshState, setRefreshState] = useState(uuidv4());
  const [appChainId, setAppChainId] = useState(chainId);
  const [appConfig, setAppConfig] = useState<any>({});
  useEffect(() => {
    if (window) {
      const chainId = localStorage.getItem(CHAINID_KEY);
      if (chainId) setAppChainId(Number(chainId));
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage?.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const res = await getProfileApi();
      if (res) setProfile(res);
    };

    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated, refreshState]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsAuthenticated(false);
    router.push(URL.LOGIN);
  };

  const handleLogin = async (values: any) => {
    const res = await loginApi(values);
    if (res) {
      if (res?.user?.isVerified) {
        toast.success('Login successfully');
        localStorage.setItem(ACCESS_TOKEN_KEY, res?.token?.accessToken);
        setIsAuthenticated(true);
        router.push(URL.P2P);
      } else router.push({ pathname: '/register', query: { step: SIGN_UP_STEP.VERIFY_OTP, email: values.email } });
    }
  };

  const handleSetChainId = (chainId: number) => {
    setAppChainId(chainId);
    localStorage.setItem(CHAINID_KEY, chainId.toString());
  };

  const value = useMemo(() => {
    return {
      isAuthenticated,
      handleLogout,
      handleLogin,
      profile,
      setRefreshState,
      appChainId,
      handleSetChainId,
      appConfig,
      setAppConfig,
      setIsAuthenticated,
    };
  }, [isAuthenticated, profile, appChainId, appConfig]);

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

export default ApplicationProvider;
