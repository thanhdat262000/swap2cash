import ModalAddPaymentMethod from '@components//Modal/ModalAddPaymentMethod';
import { Button } from 'antd';
import { PAYMENT_NAME_BY_TYPE, PAYMENT_TYPE } from 'constants/type';
import { useApplicationContext } from 'contexts/ApplicationContext';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { createPaymentApi, deletePaymentApi, editPaymentApi, getListPaymentApi } from 'services/payment';
import LoadingIcon from 'components/common/LoadingIcon';
import ModalConfirm from '@components//Modal/ModalConfirm';
import { toast } from 'react-hot-toast';
import { useRefreshState } from 'hooks/useRefreshState';

const Payment = () => {
  const { profile, isAuthenticated } = useApplicationContext();
  const [listPayment, setListPayment] = useState([]);
  const [addNewModalVisible, setAddNewModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState('');
  const [paymentToUpdate, setPaymentToUpdate] = useState('');
  const { refreshState, setNewRefreshState } = useRefreshState();

  const paymentData = paymentToUpdate ? listPayment.find((payment: any) => payment.id === paymentToUpdate) : null;
  useEffect(() => {
    const getListPayment = async () => {
      setIsLoading(true);
      const res = await getListPaymentApi();
      if (res) setListPayment(res.data);
      setIsLoading(false);
    };

    if (isAuthenticated) {
      getListPayment();
    }
  }, [isAuthenticated, refreshState]);

  const handleDeletePayment = (id: string) => {
    setDeleteVisible(true);
    setPaymentToDelete(id);
  };

  const handleConfirmDeletePayment = async () => {
    const res = await deletePaymentApi({ id: paymentToDelete });
    if (res) {
      toast.success('Delete payment method successfully!');
      onCloseDeleteModal();
      setNewRefreshState();
    }
  };

  const handleUpdatePayment = (id: string) => {
    setAddNewModalVisible(true);
    setPaymentToUpdate(id);
  };

  const onCloseAddNewModal = () => {
    setAddNewModalVisible(false);
    if (paymentToUpdate) setPaymentToUpdate('');
  };

  const onCloseDeleteModal = () => {
    setDeleteVisible(false);
    setPaymentToDelete('');
  };

  const onSubmitAddNew = async (values: any) => {
    const params = {
      type: values.type,
      name: values.name,
      accountName: values.accountName,
      listPaymentAccountNumber: [
        {
          accountNumber: values.accountNumber,
        },
      ],
      note: values.note,
    };
    setIsLoading(true);
    const res = await createPaymentApi(params);
    if (res) {
      setIsLoading(false);
      onCloseAddNewModal();
      toast.success('Create Payment Method Successfully');
      setNewRefreshState();
    }
  };

  const onSubmitUpdate = async (values: any) => {
    const params = {
      type: values.type,
      name: values.name,
      accountName: values.accountName,
      listPaymentAccountNumber: [
        {
          accountNumber: values.accountNumber,
        },
      ],
      id: paymentToUpdate,
      note: values.note,
    };
    setIsLoading(true);
    const res = await editPaymentApi(params);
    if (res) {
      setIsLoading(false);
      onCloseAddNewModal();

      toast.success('Update Payment Method Successfully');
      setNewRefreshState();
    }
  };

  const PaymentItem = ({
    name,
    accountName,
    accountNumber,
    type,
    id,
  }: {
    name: string;
    accountName: string;
    accountNumber: string;
    type: PAYMENT_TYPE;
    id: string;
  }) => {
    return (
      <div className="border border-solid border-divider rounded-md w-full">
        <div className="flex items-center justify-between border-b border-solid border-divider px-4 py-2 bg-slate-200">
          <span className="font-semibold">{PAYMENT_NAME_BY_TYPE[type]}</span>
          <div className="text-xs font-semibold text-neutral-400 divide-x divide-solid divide-divider">
            <span className="px-2 cursor-pointer" onClick={() => handleUpdatePayment(id)}>
              Update
            </span>
            <span className="pl-2 cursor-pointer" onClick={() => handleDeletePayment(id)}>
              Delete
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 px-3 py-2">
          <div className="flex flex-col items-start">
            <span className="text-xs text-neutral-400 font-medium">Name</span>
            <span className="text-lg break-all">{accountName}</span>
          </div>
          <div className="flex flex-col items-start col-span-2">
            <span className="text-xs text-neutral-400 font-medium">Bank Account Number</span>
            <span className="text-lg break-all">{accountNumber}</span>
          </div>
          <div className="flex flex-col items-start col-span-2">
            <span className="text-xs text-neutral-400 font-medium">Bank Name</span>
            <span className="text-lg break-all">{name}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Button className="btn-primary space-x-1 mb-4" onClick={() => setAddNewModalVisible(true)}>
        <FaPlus /> <span>Add New</span>
      </Button>
      <div className="flex items-center flex-col space-y-4">
        {!!listPayment.length &&
          !isLoading &&
          listPayment.map((payment: any, index) => (
            <PaymentItem
              name={payment.name}
              accountName={payment.accountName}
              accountNumber={payment.listPaymentAccountNumber[0].accountNumber}
              type={payment.type}
              key={index}
              id={payment.id}
            />
          ))}
        {isLoading && <LoadingIcon />}
      </div>
      {addNewModalVisible && (
        <ModalAddPaymentMethod
          visible={addNewModalVisible}
          onClose={onCloseAddNewModal}
          paymentData={paymentData}
          onSubmitAddNew={onSubmitAddNew}
          onSubmitUpdate={onSubmitUpdate}
        />
      )}
      <ModalConfirm
        title="Delete Payment Method"
        description="All orders that use this payment method will be deleted as well. Are you sure you want to delete this payment method?"
        visible={deleteModalVisible}
        onClose={onCloseDeleteModal}
        onConfirm={handleConfirmDeletePayment}
      />
    </div>
  );
};

export default Payment;
