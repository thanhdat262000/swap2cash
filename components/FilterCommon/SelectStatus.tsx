import { Select } from 'antd';
import { TRADE_STATUS_INFO } from 'constants/trade';
import { filterOption } from 'utils';

const SelectStatus = ({ onChangeStatus, value }: any) => {
  const listStatus = Object.values(TRADE_STATUS_INFO);
  return (
    <Select
      onChange={onChangeStatus}
      value={value}
      allowClear
      className="!w-[12rem]"
      placeholder="Select Status"
      options={listStatus}
    />
  );
};

export default SelectStatus;
