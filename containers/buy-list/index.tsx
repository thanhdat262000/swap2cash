import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getListBuyApi, updateProofAPI } from 'services/buy';
import { columns } from './columns';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { removeEmptyKey } from 'utils';
import OptionsBar from './OptionsBar';
import { useModal } from 'hooks/useModal';
import ModalUploadEvidence from '@components//Modal/ModalBuy/ModalUploadEvidence';
import showMessage from '@components//Message';
import TYPE_CONSTANTS from 'constants/type';

const BuyList = ({ listCurrency, listCurrencyFiat }: any) => {
  const [data, setData] = useState<any>([]);
  const { visible, onOpenModal, onCloseModal } = useModal();
  const [dataSelected, setDataSelected] = useState({});

  const { appChainId } = useApplicationContext();
  const [paramsSearch, setParamsSearch] = useState<any>({
    currencyId: null,
    fiatCurrencyId: null,
    status: null,
  });

  const { currencyId, fiatCurrencyId, status } = paramsSearch;

  const fetchBuyDetail = async () => {
    if (!appChainId) {
      return;
    }
    const paramQuery = {
      currencyId,
      fiatCurrencyId,
      status,
      chainId: appChainId,
    };
    const res = await getListBuyApi(removeEmptyKey(paramQuery));
    if (res) {
      setData(res.data);
    }
  };

  const onUploadEvidence = async ({ description, dataProof, purchaseId }: any) => {
    console.log('123');
    try {
      const res = await updateProofAPI({ description, dataProof, purchaseId });
      if (res) {
        fetchBuyDetail();
        setDataSelected({});
        onCloseModal();
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Upload evidence success');
      }
    } catch (e) {
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'An unknown error occurred. Check the console for more details.');
      console.log('e', e);
    }
  };

  const onShowModalEvidence = (record: any) => () => {
    setDataSelected(record);
    onOpenModal();
  };

  useEffect(() => {
    fetchBuyDetail();
  }, [currencyId, fiatCurrencyId, status, appChainId]);

  return (
    <div>
      <div className="bg-white rounded-xl">
        <OptionsBar
          listCurrency={listCurrency}
          listCurrencyFiat={listCurrencyFiat}
          paramsSearch={paramsSearch}
          setParamsSearch={setParamsSearch}
        />
        <div className="flex items-center text-gray-400 mt-4">
          <Table
            columns={columns(onShowModalEvidence)}
            dataSource={data}
            className="custom-table"
            scroll={{ x: 900 }}
          />
        </div>
      </div>
      {visible && (
        <ModalUploadEvidence visible={visible} onClose={onCloseModal} onSubmit={onUploadEvidence} data={dataSelected} />
      )}
    </div>
  );
};

export default BuyList;
