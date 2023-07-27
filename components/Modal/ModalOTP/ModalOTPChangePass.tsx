import { Button } from 'antd';
import ModalComponent from '..';
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';
import { useInterval } from 'hooks/useInterval';
import { resendOTP, verifyOTP } from 'services/buy';
import { useRouter } from 'next/router';
import { URL } from 'constants/routes';
import { sendOTPChangePass, verifyOtpChangePassApi } from 'services/auth';
import { useApplicationContext } from 'contexts/ApplicationContext';

const OTP_LENGTH = 6;
const TIME_RESEND_CODE = 60;

const ModalOTPChangePass = ({ visible, onClose, data, callbackSuccess }: any) => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const [currentCode, setCurrentCode] = useState('');
  const [countResentTime, setCountResentTime] = useState(TIME_RESEND_CODE);
  const [enableResendLink, setEnableResendLink] = useState(true);
  const { profile, isAuthenticated } = useApplicationContext();

  const countTime = () => {
    setCountResentTime((prevVal: number) => {
      if (prevVal === 1) {
        setEnableResendLink(true);
        interval.stop();
        return TIME_RESEND_CODE;
      }
      return prevVal - 1;
    });
  };
  const interval = useInterval(countTime, 1000);

  useEffect(() => {
    sendOTPChangePass({});
  }, []);

  const resendCode = async () => {
    setEnableResendLink(false);
    await sendOTPChangePass({});
    interval.start();
  };

  const onSubmit = async (value: any) => {
    if (isNaN(value)) {
      return;
    }
    setOtp(value);
    if (value.length >= OTP_LENGTH) {
      const res = await verifyOtpChangePassApi({
        otpCode: value,
      });
      if (res && callbackSuccess) {
        callbackSuccess();
      }
      setCurrentCode(value);
    }
  };
  return (
    <ModalComponent wrapClassName="modal-otp" visible={visible} width={495} onClose={onClose} showCloseIcon={true}>
      <div className="modal-otp__title">OTP Verification</div>
      <div>Enter the OTP you received at {profile?.email}</div>
      <div className="verify-account__input">
        <OtpInput
          className="input__wrap-input"
          value={otp}
          onChange={onSubmit}
          numInputs={OTP_LENGTH}
          isInputNum={true}
          focusStyle="verify-account__input--focus"
          shouldAutoFocus
        />
      </div>
      <div className="modal-otp__action">
        <Button disabled={!enableResendLink} className="modal-otp__resend-code" onClick={resendCode} type="primary">
          Resend Code {enableResendLink ? '' : `(${countResentTime}s)`}
        </Button>
      </div>
    </ModalComponent>
  );
};

export default ModalOTPChangePass;
