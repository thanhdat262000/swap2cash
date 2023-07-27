import { Select } from 'antd';
import { filterOption } from 'utils';

const SelectFiat = ({ onChangeFiatCurrencyId, value, listCurrencyFiat }: any) => {
  return (
    <Select
      onChange={onChangeFiatCurrencyId}
      value={value}
      allowClear
      showSearch
      filterOption={filterOption}
      className="!w-[12rem]"
      placeholder="Select Fiat Currency"
      options={
        listCurrencyFiat
          ? listCurrencyFiat.map((fiat: any, index: number) => ({
              label: (
                <div className="flex items-center space-x-2 h-full w-full" key={index}>
                  <div className=" w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px]">
                    {fiat.symbol}
                  </div>
                  <span className="flex-1 truncate">{fiat.name}</span>
                </div>
              ),
              value: fiat?.id,
              textFilter: fiat.name,
            }))
          : []
      }
    />
  );
};

export default SelectFiat;
