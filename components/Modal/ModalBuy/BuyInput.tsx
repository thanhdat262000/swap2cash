import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { Button } from 'antd';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { getFullUrl } from 'utils';
import { validateSchema } from './schema';
import { calPayVal, calReceiveVal } from './utils';
import Image from 'next/image';

const BuyInput = ({ data, onClose, onSubmit }: { data: any; onClose: () => void; onSubmit: any }) => {
  const { rate, avaiable, crypto, fiat, max, min } = data;
  const [initialValues, setInitialValues] = useState({
    pay: null,
    receive: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangePayValue = (e: any, setFieldValue: any) => {
    const newPayVal = e.target.value;
    if (newPayVal) {
      const newReceive = calReceiveVal(newPayVal, rate);
      setFieldValue('receive', newReceive);
    }
  };
  const onChangeReceiveValue = (e: any, setFieldValue: any) => {
    const newReceive = e.target.value;
    if (newReceive) {
      const newPayVal = calPayVal(newReceive, rate);
      setFieldValue('pay', newPayVal);
    }
  };

  const onClickMax = (setFieldValue: any) => {
    const newPay = calPayVal(avaiable.toString(), rate);
    setFieldValue('pay', newPay);
    setFieldValue('receive', avaiable);
  };

  return (
    <div className="modal-buy-input">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema(data)}>
        {({ values, setFieldValue, errors }) => (
          <Form className="flex flex-col">
            <FormItem
              name="pay"
              label="I will pay"
              className="h-12"
              typeInput={TYPE_INPUT.NUMBER}
              inputProps={{
                prefix: <div className="modal-buy-input__fiat-symbol">{data.fiatCurrency.symbol}</div>,
                suffix: (
                  <div>
                    {fiat} |
                    <Button onClick={() => onClickMax(setFieldValue)} className="modal-buy-input__all" type="link">
                      All
                    </Button>
                  </div>
                ),
              }}
              thousandSeparator
              onChange={(e: any) => onChangePayValue(e, setFieldValue)}
            />
            <FormItem
              name="receive"
              label="I will receive"
              labelClassName="modal-buy-input__receive"
              className="h-12"
              typeInput={TYPE_INPUT.NUMBER}
              inputProps={{
                prefix: <Image src={getFullUrl(data.currency.iconUrl)} alt="crypto" width={20} height={20} />,
                suffix: (
                  <div>
                    {crypto} |
                    <Button onClick={() => onClickMax(setFieldValue)} className="modal-buy-input__all" type="link">
                      All
                    </Button>
                  </div>
                ),
              }}
              thousandSeparator
              onChange={(e: any) => onChangeReceiveValue(e, setFieldValue)}
            />
            <div className="flex w-full justify-between modal-buy-actions">
              <Button disabled={!isEmpty(errors) || !values.pay} htmlType="submit" loading={isLoading}>
                Buy
              </Button>
              <Button className="btn-cancel" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div className="modal-buy__tip">The coins you&apos;ve bought will be credited to your Funding Account.</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BuyInput;
