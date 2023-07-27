import { Button, Select } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getCurrencyApi, getCurrencyFiatApi } from 'services/currency';

import { FaPlus } from 'react-icons/fa';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { useRouter } from 'next/router';
import { filterOption } from 'utils';
import SelectCurrency from '@components//FilterCommon/SelectCurrency';
import SelectFiat from '@components//FilterCommon/SelectFiat';

interface IOptionsBarProps {
  onCreateSellOrder: () => void;
  setVisible: any;
  currencyId?: any;
  fiatCurrencyId?: any;
}

const OptionsBar = ({ onCreateSellOrder, paramsSearch, setParamsSearch, listCurrency, listCurrencyFiat }: any) => {
  const { appChainId } = useApplicationContext();

  const onChangeCurrencyId = (value: string) => {
    setParamsSearch({ ...paramsSearch, currencyId: value });
  };

  const onChangeFiatCurrencyId = (value: string) => {
    setParamsSearch({ ...paramsSearch, fiatCurrencyId: value });
  };

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col justify-between">
        <div className="flex items-center space-x-4">
          <SelectCurrency
            onChangeCurrencyId={onChangeCurrencyId}
            value={paramsSearch.currencyId}
            listCurrency={listCurrency}
            appChainId={appChainId}
          />

          <div className="flex items-center space-x-2">
            <SelectFiat
              onChangeFiatCurrencyId={onChangeFiatCurrencyId}
              value={paramsSearch.fiatCurrencyId}
              listCurrencyFiat={listCurrencyFiat}
            />
          </div>
        </div>

        <Button className="btn-primary btn-create-sellorder" onClick={onCreateSellOrder}>
          <FaPlus size={14} color="white" />
          <span className="ml-1">Create Sell Order</span>
        </Button>
      </div>
    </div>
  );
};

export default OptionsBar;
