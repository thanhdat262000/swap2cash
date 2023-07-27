import React, { useState } from 'react';
import { Button } from 'antd';
import ModalComponent from '@components//Modal';
import { Form, Formik } from 'formik';
import FormItem from '@components//FormItem';
import { mixed, object, string } from 'yup';
import BaseWalletService, { isAddress } from 'services/BaseWalletService';
import { updateTxWithdrawApi, withdrawReferralApi, withdrawTokenApi } from 'services/payment';
import { useApplicationContext } from 'contexts/ApplicationContext';
import showMessage from '@components//Message';
import TYPE_CONSTANTS from 'constants/type';
import Abi from 'constants/abi/Swap2Cash.json';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-hot-toast';

interface IModalWithdrawReferralProps {
  onClose: any;
  callbackSuccess: any;
  visible: boolean;
}

const ModalWithdrawReferral = ({ onClose, callbackSuccess, visible, listWalletData }: any) => {
  const { appChainId } = useApplicationContext();
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const onConfirm = async (values: any) => {
    const { walletAddress } = values;
    console.log('values', values);
    setLoading(true);
    const res = await withdrawReferralApi({
      // chainId: appChainId,
    });

    if (!res) {
      setLoading(false);
      return showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'Something went wrong');
    }
    showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Withdraw referral reward success');
    callbackSuccess();
  };

  console.log('listWalletData', listWalletData);

  const validateSchema = object({});

  return (
    <ModalComponent
      showCloseIcon
      onClose={onClose}
      visible={visible}
      width={550}
      destroyOnClose
      title={'Do you want to withdraw referral reward'}
      wrapClassName="modal modal-confirm"
    >
      <div className="flex flex-col item">
        <Formik initialValues={{ walletAddress: '' }} onSubmit={onConfirm} validationSchema={validateSchema}>
          {({ values, setFieldValue, errors }) => {
            console.log('errors', errors);
            return (
              <Form className="flex flex-col">
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

export default ModalWithdrawReferral;
