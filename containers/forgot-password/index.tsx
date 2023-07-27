import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { Button, Statistic } from 'antd';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  forgotPasswordApi,
  resendOTPForgotPasswordApi,
  resetPasswordApi,
  verifyOtpCodeForgotPasswordApi,
} from 'services/auth';
import * as Yup from 'yup';

const { Countdown } = Statistic;

export enum FORGOT_PASSWORD_STEP {
  FORGOT = 'forgot',
  VERIFY_OTP = 'verify',
  NEW_PASSWORD = 'new_password',
}

const validationSchema = Yup.object({
  email: Yup.string().required('This field is required'),
});

const newPasswordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required('This field is required')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character',
    ),
  confirmNewPassword: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('newPassword')], 'Password does not match!'),
});

const ForgotPasswordContainer = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdownValue, setCountdownValue] = useState(Date.now() + 60 * 1000);
  const router = useRouter();
  const onSubmit = async (values: any) => {
    setLoading(true);
    const res = await forgotPasswordApi({ ...values });
    setLoading(false);
    if (res && !res.isVerified)
      router.push({ pathname: router.pathname, query: { step: FORGOT_PASSWORD_STEP.VERIFY_OTP, email: values.email } });
  };

  const onVerify = async (values: any) => {
    setLoading(true);
    const res = await verifyOtpCodeForgotPasswordApi({ otpCode: values.otpCode, email: router.query.email });
    setLoading(false);
    if (res)
      router.push({
        pathname: router.pathname,
        query: { ...router.query, step: FORGOT_PASSWORD_STEP.NEW_PASSWORD, code: values.otpCode },
      });
  };

  const onResendOTP = async () => {
    const res = await resendOTPForgotPasswordApi({ email: router.query?.email });
    if (res) {
      setIsResendDisabled(true);
      setCountdownValue(Date.now() + 60 * 1000);
    }
  };

  const onResetPassword = async (values: any) => {
    setLoading(true);
    const res = await resetPasswordApi({
      password: values.newPassword,
      otpCode: router.query.code,
      email: router.query.email,
    });
    setLoading(false);
    if (res) {
      toast.success('Reset password successfully.');
      router.push('/login');
    }
  };

  return (
    <div className="flex-1 flex items-center py-8">
      <div className="m-auto w-[420px] rounded-3xl shadow-xl shadow-slate-500 p-12 bg-white">
        <h3 className="text-center text-2xl font-bold mb-2">
          {router.query.step === FORGOT_PASSWORD_STEP.VERIFY_OTP && 'Verify OTP'}
          {(router.query.step === FORGOT_PASSWORD_STEP.FORGOT || isEmpty(router.query)) && 'Forgot password'}
          {router.query.step === FORGOT_PASSWORD_STEP.NEW_PASSWORD && 'New password'}
        </h3>
        <div>
          {(router.query.step === FORGOT_PASSWORD_STEP.FORGOT || isEmpty(router.query)) && (
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {({ values }) => (
                <Form className="flex flex-col space-y-4">
                  <FormItem
                    label="Email"
                    name="email"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter email"
                    containerClassName="flex-1"
                  />

                  <Button className="btn-primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          )}
          {router.query.step === FORGOT_PASSWORD_STEP.VERIFY_OTP && (
            <Formik initialValues={{ otpCode: '' }} onSubmit={onVerify}>
              {({ values }) => (
                <Form className="flex flex-col space-y-4">
                  <FormItem
                    typeInput={TYPE_INPUT.NUMBER}
                    label="OTP Code"
                    name="otpCode"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter OTP code"
                  />
                  {isResendDisabled ? (
                    <div className=" !text-stone-400 !text-base flex items-center">
                      <span>Resend in&nbsp;</span>
                      <Countdown
                        value={countdownValue}
                        format="ss"
                        onFinish={() => setIsResendDisabled(false)}
                        prefix="("
                        suffix=")"
                        className="!text-sm !text-stone-400"
                      />
                    </div>
                  ) : (
                    <p className="text-primary cursor-pointer" onClick={onResendOTP}>
                      Resend OTP
                    </p>
                  )}
                  <Button className="btn-primary" htmlType="submit" disabled={!values.otpCode} loading={loading}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          )}
          {router.query.step === FORGOT_PASSWORD_STEP.NEW_PASSWORD && (
            <Formik
              initialValues={{ newPassword: '', confirmNewPassword: '' }}
              onSubmit={onResetPassword}
              validationSchema={newPasswordValidationSchema}
            >
              {({ values }) => (
                <Form className="flex flex-col space-y-4">
                  <FormItem
                    typeInput={TYPE_INPUT.PASSWORD}
                    label="New password"
                    name="newPassword"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter new password"
                    containerClassName="flex-1"
                  />
                  <FormItem
                    typeInput={TYPE_INPUT.PASSWORD}
                    label="Confirm new password"
                    name="confirmNewPassword"
                    className="rounded-xl h-12"
                    required
                    placeholder="Confirm new password"
                    containerClassName="flex-1"
                  />

                  <Button className="btn-primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordContainer;
