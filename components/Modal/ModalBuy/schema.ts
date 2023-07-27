import { BuyInfoType } from 'constants/type';
import { formatCommaNumber } from 'utils';
import { mixed, object } from 'yup';
import { calReceiveVal } from './utils';

export const validateSchema = (data: BuyInfoType) => {
  // const { min, max, fiat, crypto, rate } = data;
  // const maxReceive = calReceiveVal(max.toString(), rate);
  // Ignore Validate
  return object({});
  // return object({
  //   pay: mixed()
  //     .required(`The min. transaction amount is ${formatCommaNumber(min)} VND.`)
  //     .test({
  //       name: 'test-max',
  //       message: `The max. transaction amount is ${max} ${fiat}.`,
  //       test: (val: string) => {
  //         if (!val) {
  //           return true;
  //         }
  //         return Number(val) <= Number(max);
  //       },
  //     }),
  //   receive: mixed().test({
  //     name: 'test-max',
  //     message: `The max. transaction amount is ${maxReceive} ${crypto}.`,
  //     test: (val: string) => {
  //       if (!val) {
  //         return true;
  //       }
  //       return Number(val) <= Number(maxReceive);
  //     },
  //   }),
  // });
};
