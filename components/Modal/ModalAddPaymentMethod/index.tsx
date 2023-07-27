import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { Button } from 'antd';
import { MESSAGES } from 'constants/messages';
import { PAYMENT_TYPE } from 'constants/type';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ModalComponent from '..';

const PAYMENT_TYPE_OPTIONS = [
  {
    name: 'Bank Transfer',
    value: PAYMENT_TYPE.BANK_TRANSFER,
  },
  {
    name: 'E-Wallet',
    value: PAYMENT_TYPE.E_WALLET,
  },
];

interface IModalAddPaymentMethodProps {
  visible: boolean;
  onClose: () => void;
  paymentData: any;
  onSubmitAddNew: any;
  onSubmitUpdate: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required(MESSAGES.REQUIRED),
  accountNumber: Yup.string().required(MESSAGES.REQUIRED),
});

const ModalAddPaymentMethod = ({
  visible,
  onClose,
  paymentData,
  onSubmitAddNew,
  onSubmitUpdate,
}: IModalAddPaymentMethodProps) => {
  const [initialValues, setInitialValues] = useState({
    type: PAYMENT_TYPE_OPTIONS[0].value,
    name: '',
    accountNumber: '',
    accountName: '',
    note: '',
  });

  useEffect(() => {
    if (paymentData) {
      setInitialValues({
        name: paymentData.name,
        accountNumber: paymentData.listPaymentAccountNumber[0].accountNumber,
        accountName: paymentData.accountName,
        type: paymentData.type,
        note: paymentData.note,
      });
    }
  }, [paymentData]);

  return (
    <ModalComponent
      visible={visible}
      title={paymentData ? 'Update Payment Method' : 'Add Payment'}
      width={400}
      onClose={onClose}
      maskClosable={false}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={paymentData ? onSubmitUpdate : onSubmitAddNew}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="pt-4">
            <FormItem
              label="Payment method"
              required
              name="type"
              placeholder="Payment Method"
              typeInput={TYPE_INPUT.SELECT}
              options={PAYMENT_TYPE_OPTIONS}
              className="mb-4"
            />
            {values.type === PAYMENT_TYPE.BANK_TRANSFER && (
              <div className="flex flex-col space-y-4">
                <FormItem label="Name" required placeholder="Please Enter Name" name="accountName" className="h-12" />
                <FormItem
                  label="Bank Account Number"
                  required
                  placeholder="Please Enter Bank Account Number"
                  name="accountNumber"
                  className="h-12"
                />
                <FormItem
                  label="Bank name"
                  required
                  placeholder="Please Enter Bank name"
                  name="name"
                  className="h-12"
                />
                <FormItem label="Note" placeholder="Your payment note" name="note" className="h-12" />
              </div>
            )}
            {values.type === PAYMENT_TYPE.E_WALLET && (
              <div className="flex flex-col space-y-4">
                <FormItem label="Name" required placeholder="Please Enter Name" name="accountName" className="h-12" />
                <FormItem
                  label="Payment name"
                  required
                  placeholder="Please Enter Payment name"
                  name="name"
                  className="h-12"
                />

                <FormItem
                  label="Payment Number"
                  required
                  placeholder="Please Enter Payment Number"
                  name="accountNumber"
                  className="h-12"
                />
              </div>
            )}
            <div className="flex w-full justify-between space-x-4 mt-8">
              <Button className="btn-primary h-10 flex-1" htmlType="submit">
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

export default ModalAddPaymentMethod;
