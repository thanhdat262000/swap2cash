import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import ERC20Abi from 'constants/abi/erc20.json';
import BigNumber from 'bignumber.js';
import { MAX_BALANCE } from 'constants/wallet';
import { toast } from 'react-hot-toast';

export function isAddress(address: string) {
  try {
    return getAddress(address);
  } catch {
    return false;
  }
}

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library?.getSigner();
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || isNativeToken(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function isNativeToken(address: string) {
  return address === AddressZero;
}

export default class BaseWalletService {
  address: string | null;
  contract: Contract | undefined;

  constructor(props: { address: string; abi: any; library: Web3Provider }) {
    this.address = props?.address;
    const contract = getContract(this.address, props.abi, props.library);
    this.contract = contract;
  }

  isAllowance = async (
    tokenAddress: string,
    ownerAddress: string,
    spenderAddress: string,
    library: Web3Provider,
    balance: string,
  ) => {
    try {
      const tokenContract = getContract(tokenAddress, ERC20Abi.abi, library);
      const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
      const compareResult = new BigNumber(balance).comparedTo(allowance.toString());
      console.log('compareResult', compareResult);

      return compareResult === 1;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  approve = async (tokenAddress: string, ownerAddress: string, spenderAddress: string, library: Web3Provider) => {
    try {
      const tokenContract = getContract(tokenAddress, ERC20Abi.abi, library);
      const response = await tokenContract.approve(spenderAddress, MAX_BALANCE);
      const receipt = await response.wait();
      if (receipt.status) return true;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  withdrawToken = async (dataSign: any, signature: any) => {
    try {
      const { amountsDecimal, serviceFeeAmount, tokens, userId, _id, to } = dataSign;
      console.log('data contract', [tokens, amountsDecimal, to, serviceFeeAmount, [userId, _id, signature]]);
      const response = await this.contract?.withdraw(
        tokens,
        amountsDecimal,
        to,
        serviceFeeAmount,
        [userId, _id, signature],
        {
          value: serviceFeeAmount,
        },
      );
      console.log('response', response);
      const receipt = await response.wait();
      console.log('receipt', receipt);
      if (receipt.status) return response;
    } catch (error: any) {
      console.log('error', error);
      toast.error(error.message);
    }
  };

  cancelSellOrder = async (dataSign: any, signature: any) => {
    try {
      const { amount, to, token, userId, _id } = dataSign;
      console.log('data contract', {
        token,
        amount,
        userId,
        _id,
        signature,
      });
      const response = await this.contract?.cancelSellOrder(token, amount, to, userId, _id, signature);
      console.log('response', response);
      const receipt = await response.wait();
      console.log('receipt', receipt);
      if (receipt.status) return response;
    } catch (error: any) {
      console.log('error', error);
      toast.error(error.message);
    }
  };
}
