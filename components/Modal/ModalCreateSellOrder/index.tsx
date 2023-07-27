import React, { useEffect, useState } from 'react';
import ModalComponent from '..';
import { Form, Formik } from 'formik';
import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { getCurrencyApi, getCurrencyFiatApi } from 'services/currency';
import Image from 'next/image';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { Button } from 'antd';
import { useWeb3React } from '@web3-react/core';
import * as Yup from 'yup';
import { MESSAGES } from 'constants/messages';
import { createSellOrderApi, rejectSellOrderApi, updateSuccessSellOrderApi } from 'services/order';
import { toast } from 'react-hot-toast';
import BaseWalletService from 'services/BaseWalletService';
import Abi from 'constants/abi/Swap2Cash.json';
import BigNumber from 'bignumber.js';
import { convertStringToHex } from 'utils/wallet';
import { NATIVE_TOKEN_ADDRESS } from 'constants/wallet';
import { NETWORK_NAME_BY_CHAINID, PROFILE_TABS_KEYS } from 'constants/type';
import { useRouter } from 'next/router';
import { URL } from 'constants/routes';
import { P2P_TYPE } from 'constants/trade';
import { filterOption } from 'utils';

interface IModalCreateSellOrderProps {
  visible: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  currencyId: Yup.string().nullable().required(MESSAGES.REQUIRED),
  amount: Yup.string().required(MESSAGES.REQUIRED),
  fiatCurrencyId: Yup.string().nullable().required(MESSAGES.REQUIRED),
  paymentMethod: Yup.array().nullable().required(MESSAGES.REQUIRED),
});

const cvcContractAddress = process.env.NEXT_PUBLIC_CONTRACT_CVC_ADDRESS;

const ModalCreateSellOrder = ({ visible, onClose }: IModalCreateSellOrderProps) => {
  const [initialValues, setInitialValues] = useState({
    currencyId: null,
    fiatCurrencyId: null,
    paymentMethod: [],
  });
  const [listCurrency, setListCurrency] = useState<any[]>([]);
  const [listCurrencyFiat, setListCurrencyFiat] = useState<any[]>([]);
  const { profile, appChainId } = useApplicationContext();
  const { account, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const contractInstance = new BaseWalletService({
    address: cvcContractAddress as string,
    abi: Abi.output.abi,
    library,
  });

  const onSubmit = async (values: any) => {
    if (!account) {
      toast.error('You must connect your wallet before create sell order!');
      return;
    }
    if (chainId !== appChainId) {
      toast.error(`Please switch to ${NETWORK_NAME_BY_CHAINID[appChainId as number]} before continue!`);
      return;
    }

    const params = {
      currencyId: values.currencyId,
      chainId: Number(appChainId),
      amount: values.amount,
      fromWalletAddress: account,
      listAcceptablePaymentId: values.paymentMethod,
      fiatCurrencyId: values.fiatCurrencyId,
    };
    setIsLoading(true);
    const res = await createSellOrderApi(params);
    if (res) {
      try {
        const argumentsArray: any[] = [
          res.currency.tokenId,
          new BigNumber(values.amount).multipliedBy(Math.pow(10, res.currency.decimal)).toString(),
          convertStringToHex(res.id),
          res.signaturePutOnSale,
        ];
        console.log('res.currency', res.currency);
        if (res.currency.tokenId === NATIVE_TOKEN_ADDRESS)
          argumentsArray.push({
            value: new BigNumber(values.amount).multipliedBy(10 ** 18).toString(),
          });
        if (res.currency.tokenId !== NATIVE_TOKEN_ADDRESS) {
          const isAlowance = await contractInstance.isAllowance(
            res.currency.tokenId,
            account,
            cvcContractAddress as string,
            library,
            new BigNumber(values.amount).multipliedBy(Math.pow(10, res.currency.decimal)).toString(),
          );
          if (isAlowance) {
            const approveRes = await contractInstance.approve(
              res.currency.tokenId,
              account,
              cvcContractAddress as string,
              library,
            );
            if (approveRes) toast.success('Approve successfully.');
          }
        }
        console.log('argumentsArray', argumentsArray);
        const transaction = await contractInstance.contract?.createSellOrder(...argumentsArray);
        console.log('transaction', transaction);
        const result = await transaction.wait();
        if (result) {
          const updateRes = await updateSuccessSellOrderApi({ id: res.id, txId: result.transactionHash });
          if (updateRes) {
            toast.success('Create order successfully.');
            router.push({ pathname: URL.P2P, query: { type: P2P_TYPE.SELL } });
          }
        }
      } catch (error: any) {
        await rejectSellOrderApi({ id: res.id });
        toast.error(error.message);
        console.log(error);
      }
    }
    onClose();
    setIsLoading(false);
  };

  useEffect(() => {
    const getListCurrency = async () => {
      const res = await getCurrencyApi();
      if (res?.data) setListCurrency(res.data);
    };

    const getListCurrencyFiat = async () => {
      const res = await getCurrencyFiatApi();
      if (res?.data) setListCurrencyFiat(res.data);
    };
    getListCurrency();
    getListCurrencyFiat();
  }, []);

  const onChangeTokenAmount = (e: any, currencyId: any, fiatCurrencyId: any, setFieldValue: any) => {
    const amount = e.target.value;
    setFieldValue('amount', amount);
    if (!currencyId || !fiatCurrencyId) return;
    const { exchangeRate } = listCurrency.find((currency: any) => currency.id === currencyId);
    const amountInUsd = Number(amount) * exchangeRate;
    const { exchangeRate: fiatExchangeRate } = listCurrencyFiat.find(
      (fiatCurrency: any) => fiatCurrency.id === fiatCurrencyId,
    );
    setFieldValue('fiatAmount', fiatExchangeRate * amountInUsd);
  };

  return (
    <ModalComponent visible={visible} title="Create Sell Order" width={400} onClose={onClose} maskClosable={false}>
      <div className="warning-tx !mb-0">{`Please don't close popup or close website when transaction is processing`}</div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ values, setFieldValue }) => (
          <Form className="pt-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <FormItem
                label="Token"
                typeInput={TYPE_INPUT.SELECT}
                placeholder="Select Token"
                options={
                  listCurrency.length
                    ? listCurrency
                        .filter((item) => item.chainId === appChainId)
                        .map((currency: any, index: number) => ({
                          name: (
                            <div className="flex items-center space-x-2 h-full" key={index}>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${currency.iconUrl}`}
                                width={20}
                                height={20}
                              />
                              <span>{currency.name}</span>
                            </div>
                          ),
                          value: currency.id,
                        }))
                    : []
                }
                name="currencyId"
                containerClassName="flex-1"
              />
              <FormItem
                label="Currency"
                name="fiatCurrencyId"
                containerClassName="flex-1"
                placeholder="Select Fiat Currency"
                showSearch
                filterOption={filterOption}
                typeInput={TYPE_INPUT.SELECT}
                options={
                  listCurrencyFiat
                    ? listCurrencyFiat.map((fiat: any, index: number) => ({
                        name: (
                          <div className="flex items-center space-x-2 h-full w-full" key={index}>
                            <div className=" w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px]">
                              {fiat.symbol}
                            </div>
                            <span className="flex-1 truncate">{fiat.name}</span>
                          </div>
                        ),
                        value: fiat.id,
                        textFilter: fiat.name,
                      }))
                    : []
                }
                // showSearch
              />
            </div>

            <FormItem
              label="Payment Method"
              name="paymentMethod"
              typeInput={TYPE_INPUT.SELECT}
              placeholder="Select Payment Method"
              options={profile?.listPayment.map((payment: any, index: number) => ({
                name: payment.name,
                value: payment.id,
              }))}
              mode="multiple"
              showSearch={false}
            />
            <FormItem
              name="amount"
              label="Amount"
              typeInput={TYPE_INPUT.NUMBER}
              placeholder="Enter Token Amount"
              className="h-12"
              onChange={(e: any) => onChangeTokenAmount(e, values.currencyId, values.fiatCurrencyId, setFieldValue)}
            />
            <FormItem
              name="fiatAmount"
              label="Estimated Fiat amount"
              typeInput={TYPE_INPUT.NUMBER}
              placeholder="Fiat Amount"
              className="h-12"
              disabled
              thousandSeparator={true}
            />
            <div className="flex w-full justify-between space-x-4 mt-8">
              <Button className="btn-primary h-10 flex-1" htmlType="submit" loading={isLoading}>
                {' '}
                Confirm
              </Button>
              <Button className="btn-secondary h-10 flex-1" onClick={onClose}>
                {' '}
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalComponent>
  );
};

export default ModalCreateSellOrder;
