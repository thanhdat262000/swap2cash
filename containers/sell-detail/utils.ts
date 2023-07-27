import { TRADE_STATUS } from "constants/trade"

const STEP = {
  NOT_PAY: 0,
  PAID: 1,
  DONE: 2
}

export const getCurrentSellStep = (status: number) => {
  if(status === TRADE_STATUS.WAITING_TO_PAYMENT) {
    return STEP.NOT_PAY
  } else if(status === TRADE_STATUS.BUYER_CONFIRM_PAY) {
    return STEP.PAID
  } else if(status === TRADE_STATUS.SELLER_CONFIRM_PAY) {
    return STEP.DONE
  };
  return STEP.NOT_PAY
}