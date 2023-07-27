import BigNumber from 'bignumber.js';

export const calPayVal = (receive: string, rate: string) => {
  const val = new BigNumber(receive.replace(/\,/g, ''))
    .multipliedBy(new BigNumber(rate))
    .dp(6, BigNumber.ROUND_DOWN)
    .toString();
  return val;
};

export const calReceiveVal = (pay: string, rate: string) => {
  console.log('pay', pay);
  console.log('rate', rate);
  const val = new BigNumber(pay.replace(/\,/g, '')).dividedBy(new BigNumber(rate)).dp(6, BigNumber.ROUND_UP).toString();
  return val;
};
