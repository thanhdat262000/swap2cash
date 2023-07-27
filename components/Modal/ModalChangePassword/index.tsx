import React, { useState } from 'react';
import ModalComponent from '..';
import { Form, Formik } from 'formik';
import { values } from 'lodash';
import FormItem, { TYPE_INPUT } from '@components//FormItem';
import * as Yup from 'yup';
import { Button } from 'antd';
import { updateAccountInformationApi } from 'services/user';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { toast } from 'react-hot-toast';

interface IModalChangePasswordProps {
  visible: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required('This field is required')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character',
    ),
  confirmPassword: Yup.string()
    .required('This field is required')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character',
    )
    .oneOf([Yup.ref('newPassword')], 'Your password does not match'),
});

const ModalChangePassword = ({ visible, onClose }: IModalChangePasswordProps) => {
  const { profile } = useApplicationContext();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: any) => {
    const { newPassword } = values;
    setLoading(true);
    const res = await updateAccountInformationApi({
      password: newPassword,
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
    if (res) {
      setLoading(false);
      toast.success('Change password successfully.');
      onClose();
    }
  };
  return (
    <ModalComponent visible={visible} title="Change Password" width={400} onClose={onClose} maskClosable={false}>
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <FormItem
              label="New Password"
              required
              name="newPassword"
              placeholder="Enter new password"
              className="rounded-xl h-12"
              typeInput={TYPE_INPUT.PASSWORD}
            />{' '}
            <FormItem
              label="Confirm New Password"
              required
              name="confirmPassword"
              placeholder="Confirm new password"
              className="rounded-xl h-12"
              typeInput={TYPE_INPUT.PASSWORD}
            />
            <Button className="btn-primary w-full" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </ModalComponent>
  );
};

export default ModalChangePassword;
