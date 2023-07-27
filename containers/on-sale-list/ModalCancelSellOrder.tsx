import React, { useState } from 'react';
import { Button } from 'antd';
import ModalComponent from '@components//Modal';
import { Form, Formik } from 'formik';
import FormItem from '@components//FormItem';
import { mixed, object, string } from 'yup';
import BaseWalletService, { isAddress } from 'services/BaseWalletService';
import { updateTxWithdrawApi, withdrawTokenApi } from 'services/payment';
import { useApplicationContext } from 'contexts/ApplicationContext';
import showMessage from '@components//Message';
import TYPE_CONSTANTS from 'constants/type';
import Abi from 'constants/abi/Swap2Cash.json';
import { useWeb3React } from '@web3-react/core';
import { cancelPutOnSaleApi, updateTxPutOnSaleApi } from 'services/order';

interface IModalCancelSellOrderProps {
  onClose: any;
  callbackSuccess: any;
  visible: boolean;
}

const ModalCancelSellOrder = ({ onClose, callbackSuccess, visible, listWalletData, id }: any) => {
  const { appChainId } = useApplicationContext();
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const onConfirm = async (values: any) => {
    setLoading(true);
    const { walletAddress } = values;
    console.log('values', values);
    const res = await cancelPutOnSaleApi(id, { walletAddress });

    if (!res) {
      setLoading(false);

      return showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'Something went wrong');
    }
    const baseWallet = new BaseWalletService({
      address: process.env.NEXT_PUBLIC_CONTRACT_CVC_ADDRESS as string,
      abi: Abi.output.abi,
      library,
    });
    console.log('res', res);
    const { dataSign, signature } = res;
    const cancelRes = await baseWallet.cancelSellOrder(dataSign, signature);
    console.log('cancelRes', cancelRes);
    if (!cancelRes) {
      setLoading(false);
      return showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'Something went wrong');
    }
    const updateTxRes = await updateTxPutOnSaleApi(id, cancelRes.hash);
    console.log('updateTxRes', updateTxRes);
    if (updateTxRes) {
      callbackSuccess();
      setLoading(false);
    }
  };

  console.log('listWalletData', listWalletData);

  const validateSchema = object({
    walletAddress: mixed()
      .required('Wallet is required')
      .test({
        name: 'test-validate',
        message: 'Not a valid address',
        test: (val: string) => {
          return !!isAddress(val);
        },
      }),
  });

  return (
    <ModalComponent
      showCloseIcon
      onClose={onClose}
      visible={visible}
      width={550}
      destroyOnClose
      title={'Cancel sellorder'}
      wrapClassName="modal modal-confirm"
    >
      <div className="flex flex-col item pt-5">
        <div className="warning-tx">{`Please don't close popup or close website when transaction is processing`}</div>
        <Formik initialValues={{ walletAddress: '' }} onSubmit={onConfirm} validationSchema={validateSchema}>
          {({ values, setFieldValue, errors }) => {
            console.log('errors', errors);
            return (
              <Form className="flex flex-col">
                <FormItem name="walletAddress" label="Wallet address receive token" required />
                <div className="flex items-center justify-center space-x-5 mt-5">
                  <Button className="btn-primary" htmlType="submit" loading={loading}>
                    Confirm
                  </Button>
                  <Button className="btn-secondary" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalComponent>
  );
};

export default ModalCancelSellOrder;
