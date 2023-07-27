import React from 'react';
import { useApplicationContext } from 'contexts/ApplicationContext';

import SelectFiat from '@components//FilterCommon/SelectFiat';
import SelectCurrency from '@components//FilterCommon/SelectCurrency';
import SelectStatus from '@components//FilterCommon/SelectStatus';

const OptionsBar = ({ paramsSearch, setParamsSearch, listCurrency, listCurrencyFiat }: any) => {
  const { appChainId } = useApplicationContext();

  const onChangeCurrencyId = (value: string) => {
    setParamsSearch({ ...paramsSearch, currencyId: value });
  };

  const onChangeFiatCurrencyId = (value: string) => {
    setParamsSearch({ ...paramsSearch, fiatCurrencyId: value });
  };

  const onChangeStatus = (value: string) => {
    setParamsSearch({ ...paramsSearch, status: value });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-start">
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

          <div className="flex items-center space-x-2">
            <SelectStatus onChangeStatus={onChangeStatus} value={paramsSearch.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBar;
