import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { Button, Statistic } from 'antd';
import { nationality } from 'constants/nationalities';
import { URL } from 'constants/routes';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_KEY } from 'services/api';
import { registerApi, resendOTPApi, verifyOtpCodeApi } from 'services/auth';
import { getNationalitiesApi } from 'services/currency';
import * as Yup from 'yup';

const { Countdown } = Statistic;

export enum SIGN_UP_STEP {
  SIGN_UP = 'sign_up',
  VERIFY_OTP = 'verify',
}

const validationSchema = Yup.object({
  email: Yup.string().required('This field is required').email('Invalid email'),
  password: Yup.string()
    .required('This field is required')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character',
    ),
  phone: Yup.number().required('This field is required').positive('Invalid phone number'),
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  userName: Yup.string().required('This field is required'),
  nationalityId: Yup.string().required('This field is required'),
});

const RegisterContainer = () => {
  const [initialValues, setInitialValues] = useState<any>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    userName: '',
    referralCode: '',
    nationalityId: '',
  });
  const [loading, setLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdownValue, setCountdownValue] = useState(Date.now() + 60 * 1000);
  const router = useRouter();
  const { setIsAuthenticated } = useApplicationContext();
  const [nationalities, setNationalities] = useState<any>([]);

  useEffect(() => {
    const getNationalities = async () => {
      const res = await getNationalitiesApi();
      setNationalities(res);
    };
    getNationalities();
  }, []);

  useEffect(() => {
    if (nationalities.length) setInitialValues({ ...initialValues, nationalityId: nationalities[0].countryName });
  }, [nationalities]);

  const onSubmit = async (values: any) => {
    setLoading(true);
    const nationality = nationalities.find((item: any) => item.countryName === values.nationalityId);
    const res = await registerApi({ ...values, nationalityId: nationality?.id });
    setLoading(false);
    if (res && !res.isVerified)
      router.push({ pathname: router.pathname, query: { step: SIGN_UP_STEP.VERIFY_OTP, email: values.email } });
  };

  const onVerify = async (values: any) => {
    setLoading(true);

    const res = await verifyOtpCodeApi({ otpCode: values.otpCode, email: router.query.email });
    console.log('res', res);
    setLoading(false);
    if (res) {
      localStorage.setItem(ACCESS_TOKEN_KEY, res?.token?.accessToken);
      setIsAuthenticated(true);
      router.push(URL.P2P);
    }
    // if (res) router.push('/login');
  };

  useEffect(() => {
    console.log('router', router);
    const defaultReferral = router?.query?.referral || '';
    if (defaultReferral) {
      setInitialValues({
        ...initialValues,
        referralCode: defaultReferral,
      });
    }
  }, []);

  const onResendOTP = async () => {
    const res = await resendOTPApi({ email: router.query?.email });
    if (res) {
      setIsResendDisabled(true);
      setCountdownValue(Date.now() + 60 * 1000);
    }
  };

  return (
    <div className="flex-1 flex items-center py-8">
      <div className="m-auto w-[420px] rounded-3xl shadow-xl shadow-slate-500 p-12 bg-white">
        <h3 className="text-center text-2xl font-bold mb-2">
          {router.query.step === SIGN_UP_STEP.VERIFY_OTP && 'Verify OTP'}
          {(router.query.step === SIGN_UP_STEP.SIGN_UP || isEmpty(router.query)) && 'Register new account'}
        </h3>
        {(router.query.step === SIGN_UP_STEP.SIGN_UP || isEmpty(router.query)) && (
          <p className="text-base text-center mb-4">
            Have an account?&nbsp;
            <Link href="/login">
              <span className=" text-primary cursor-pointer">Login</span>
            </Link>
          </p>
        )}

        <div>
          {(router.query.step === SIGN_UP_STEP.SIGN_UP || isEmpty(router.query)) && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ values, errors, handleBlur, handleChange }) => (
                <Form className="flex flex-col space-y-4">
                  <FormItem
                    type="text"
                    label="Username"
                    name="userName"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter username"
                  />
                  <FormItem
                    label="Email"
                    name="email"
                    className="rounded-xl h-12"
                    required
                    placeholder="example@gmail.com"
                  />
                  <FormItem
                    typeInput={TYPE_INPUT.PASSWORD}
                    label="Password"
                    name="password"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter password"
                  />

                  <div className="grid grid-cols-2 gap-x-4">
                    <FormItem
                      typeInput={TYPE_INPUT.NUMBER}
                      label="Phone"
                      name="phone"
                      className="rounded-xl h-12"
                      required
                      placeholder="Enter phone number"
                      containerClassName="flex-1"
                    />
                    <FormItem
                      className="w-full"
                      typeInput={TYPE_INPUT.SELECT}
                      name="nationalityId"
                      label="Country"
                      required
                      defaultValue={nationalities[0]?.id}
                      options={nationalities?.map((item: any, index: number) => ({
                        name: (
                          <div className="flex items-center space-x-2 h-full w-full max-h-[3rem] py-2" key={index}>
                            {/* <img src={item.flag} alt="Flag" className="h-full register__flag" /> */}
                            <span>{item.countryName}</span>
                          </div>
                        ),
                        value: item.countryName,
                      }))}
                      showSearch
                    />
                  </div>

                  <FormItem
                    type="text"
                    label="First name"
                    name="firstName"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter first name"
                  />
                  <FormItem
                    type="text"
                    label="Last name"
                    name="lastName"
                    className="rounded-xl h-12"
                    required
                    placeholder="Enter last name"
                  />

                  <FormItem
                    type="text"
                    label="Referral code"
                    name="referralCode"
                    className="rounded-xl h-12"
                    placeholder="Enter referral code"
                  />

                  <Button className="btn-primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          )}
          {router.query.step === SIGN_UP_STEP.VERIFY_OTP && (
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
                      <div>Resend in&nbsp;</div>
                      <Countdown
                        value={countdownValue}
                        format="ss"
                        onFinish={() => setIsResendDisabled(false)}
                        prefix="("
                        suffix=")"
                        className="!text-sm !text-stone-400 register__resend-text"
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
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
