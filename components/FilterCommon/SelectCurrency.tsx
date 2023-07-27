import { Select } from 'antd';
import Image from 'next/image';
import { filterOption } from 'utils';

const SelectCurrency = ({ onChangeCurrencyId, value, listCurrency, appChainId }: any) => {
  return (
    <Select
      onChange={onChangeCurrencyId}
      value={value}
      placeholder="Select Token"
      allowClear
      options={
        listCurrency.length
          ? listCurrency
              .filter((item: any) => item.chainId === appChainId)
              .map((currency: any, index: number) => ({
                label: (
                  <div className="flex items-center space-x-2 h-full" key={index}>
                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${currency.iconUrl}`} width={20} height={20} />
                    <span>{currency.name}</span>
                  </div>
                ),
                value: currency?.id,
              }))
          : []
      }
      className="!w-[10rem]"
    />
  );
};

export default SelectCurrency;
