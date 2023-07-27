import { SUPPORTED_CHAIN_IDS, SupportedChainId } from 'connectors/constants';

const TYPE_CONSTANTS = {
  MESSAGE: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    IMG_DONE: 'done',
  },
};

export default TYPE_CONSTANTS;

export enum ACTION_TYPE {
  BUY,
  SELL,
}

export enum PAYMENT_TYPE {
  BANK_TRANSFER = 'bank-transfer',
  E_WALLET = 'e-wallet',
}

export const PAYMENT_NAME_BY_TYPE: { [key: string]: string } = {
  [PAYMENT_TYPE.BANK_TRANSFER]: 'Bank Transfer',
  [PAYMENT_TYPE.E_WALLET]: 'E-Wallet',
};

export const NETWORK_NAME_BY_CHAINID: { [key: number]: string } = {
  [SupportedChainId.POLYGON]: 'Polygon Testnet',
  [SupportedChainId.BSC]: 'BSC Testnet',
  [SupportedChainId.ETH]: 'ETH Testnet',
};

export const CHAINID_KEY = 'chain_id';

export enum PROFILE_TABS_KEYS {
  PAYMENT = 'payment',
  ORDER = 'order',
}

export const ORDER_TYPE = [
  {
    value: 0,
    label: 'Buy/Sell',
  },
  {
    value: 1,
    label: 'Buy',
  },
  {
    value: 2,
    label: 'Sell',
  },
];

export const ORDER_STATUS = [
  {
    value: 0,
    label: 'All',
  },
  {
    value: 2,
    label: 'Pending',
  },
  {
    value: 3,
    label: 'Done',
  },
  {
    value: 4,
    label: 'Failed',
  },
  {
    value: 5,
    label: 'Canceled',
  },
];

export const STATUS_BY_VALUE: { [key: number]: any } = {
  2: 'Pending',
  3: 'Done',
  4: 'Failed',
  5: 'Canceled',
};

export type BuyInfoType = {
  rate: number;
  avaiable: number;
  min: number;
  max: number;
  fiat: string;
  crypto: string;
};

export enum PutOnSaleStatus {
  DRAFT = 1,
  PENDING = 2,
  ACTIVE = 3,
  FAIL = 4,
  CANCELED = 5,
  CANCEL_PENDING = 6,
  CANCEL_FAIL = 7,
}

export const STATUS_TEXT_SELL_BY_VALUE: { [key: number]: any } = {
  [PutOnSaleStatus.DRAFT]: 'Draft',
  [PutOnSaleStatus.PENDING]: 'Pending',
  [PutOnSaleStatus.ACTIVE]: 'Active',
  [PutOnSaleStatus.FAIL]: 'Fail',
  [PutOnSaleStatus.CANCELED]: 'Canceled',
  [PutOnSaleStatus.CANCEL_PENDING]: 'Cancel pending',
  [PutOnSaleStatus.CANCEL_FAIL]: 'Cancel fail',
};
