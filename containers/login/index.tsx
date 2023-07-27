import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { Button } from 'antd';
import { SIGN_UP_STEP } from 'containers/register';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character',
    ),
});

const LoginContainer = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleLogin } = useApplicationContext();

  const onSubmit = async (values: any) => {
    setLoading(true);
    handleLogin(values);
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center py-8">
      <div className="m-auto w-[420px] rounded-3xl shadow-xl shadow-slate-500 p-12 bg-white">
        <h3 className="text-center text-2xl font-bold mb-2">Login</h3>
        <p className="text-base text-center mb-4">
          Don&apos;t have an account?&nbsp;
          <Link href={`/register?step=${SIGN_UP_STEP.SIGN_UP}`}>
            <span className=" text-primary cursor-pointer underline">Register</span>
          </Link>
        </p>

        <div>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ values, errors, handleBlur, handleChange }) => (
              <Form className="flex flex-col space-y-4">
                <FormItem
                  label="Email/Username"
                  name="email"
                  className="rounded-xl h-12"
                  required
                  placeholder="Enter your email/username"
                />
                <FormItem
                  typeInput={TYPE_INPUT.PASSWORD}
                  label="Password"
                  name="password"
                  className="rounded-xl h-12"
                  required
                  placeholder="Enter password"
                />
                <Link href="/forgot-password">
                  <span className=" underline text-primary cursor-pointer w-fit">Forgot password?</span>
                </Link>

                <Button className="btn-primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
