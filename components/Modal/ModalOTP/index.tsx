import { Button } from 'antd';
import ModalComponent from '..';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { useInterval } from 'hooks/useInterval';
import { resendOTP, verifyOTP } from 'services/buy';
import { useRouter } from 'next/router';
import { URL } from 'constants/routes';

const OTP_LENGTH = 6;
const TIME_RESEND_CODE = 60;

const ModalOTP = ({ visible, onClose, data }: { visible: boolean; onClose: any; data: any }) => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const [currentCode, setCurrentCode] = useState('');
  const [countResentTime, setCountResentTime] = useState(TIME_RESEND_CODE);
  const [enableResendLink, setEnableResendLink] = useState(true);

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

  const resendCode = async () => {
    setEnableResendLink(false);
    await resendOTP({ id: '' });
    interval.start();
  };

  const onSubmit = async (value: any) => {
    if (isNaN(value)) {
      return;
    }
    setOtp(value);
    if (value.length >= OTP_LENGTH) {
      const res = await verifyOTP({
        id: data.id,
        otpCode: value,
      });
      if (res) {
        router.push(`${URL.P2P}/buy/${data.id}`);
      }
      setCurrentCode(value);
    }
  };
  console.log('data.buyer', data.buyer);
  return (
    <ModalComponent wrapClassName="modal-otp" visible={visible} width={495} onClose={onClose} showCloseIcon={false}>
      <div className="modal-otp__title">OTP Verification</div>
      <div>Enter the OTP you received at {data.buyer.email}</div>
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

export default ModalOTP;
