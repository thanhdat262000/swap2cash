export const TRADE_STATUS = {
  DRAFT: 1,
  WAITING_TO_PAYMENT: 2,
  BUYER_CONFIRM_PAY: 3,
  SELLER_CONFIRM_PAY: 4,
  BUYER_NOT_CONFIRM_PAY: 5,
  CANCEL: 6,
  PENDING_BY_DISABLE_USER: 7,
};

export const TRADE_STATUS_INFO = {
  [TRADE_STATUS.DRAFT]: {
    text: 'Draft',
    label: 'Draft',
    value: TRADE_STATUS.DRAFT,
  },
  [TRADE_STATUS.WAITING_TO_PAYMENT]: {
    text: 'Waiting to payment',
    label: 'Waiting to payment',
    value: TRADE_STATUS.WAITING_TO_PAYMENT,
  },
  [TRADE_STATUS.BUYER_CONFIRM_PAY]: {
    text: 'Buyer confirmed',
    label: 'Buyer confirmed',
    value: TRADE_STATUS.BUYER_CONFIRM_PAY,
  },
  [TRADE_STATUS.SELLER_CONFIRM_PAY]: {
    text: 'Seller confirmed',
    label: 'Seller confirmed',
    value: TRADE_STATUS.SELLER_CONFIRM_PAY,
  },
  [TRADE_STATUS.BUYER_NOT_CONFIRM_PAY]: {
    text: 'Buyer not confirm',
    label: 'Buyer not confirm',
    value: TRADE_STATUS.BUYER_NOT_CONFIRM_PAY,
  },
  [TRADE_STATUS.CANCEL]: {
    text: 'Cancel',
    label: 'Cancel',
    value: TRADE_STATUS.CANCEL,
  },
  [TRADE_STATUS.PENDING_BY_DISABLE_USER]: {
    text: 'Pending By Disable User',
    label: 'Pending By Disable User',
    value: TRADE_STATUS.PENDING_BY_DISABLE_USER,
  },
};

export const P2P_TYPE = {
  BUY: 'buy',
  SELL: 'sell',
  BUY_ORDER: 'buy-orders',
  SELL_ORDER: 'sell-orders',
};
