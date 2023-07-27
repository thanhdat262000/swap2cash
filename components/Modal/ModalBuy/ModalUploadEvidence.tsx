import { Button, Col, Row } from 'antd';
import ModalComponent from '..';
import { Form, Formik } from 'formik';
import FormItem, { TYPE_INPUT } from '@components//FormItem';
import * as Yup from 'yup';
import { uploadImageAPI } from 'services/buy';
import { get, isEmpty } from 'lodash';

interface IModalCreateSellOrderProps {
  visible: boolean;
  onClose: () => void;
  data: any;
  onSubmit: any;
}

const ModalUploadEvidence = ({ visible, onClose, data, onSubmit }: IModalCreateSellOrderProps) => {
  console.log('data', data);
  const onUpdate = (values: any) => {
    console.log('values', values);
    const { description, evidences } = values;
    onSubmit({
      description,
      dataProof: (evidences?.fileList || []).map((item: any) => ({ imageUrl: item?.preview })),
      purchaseId: data.id,
    });
  };
  const defaultDesc = get(data, ['listProofTransferredMoney', 0, 'imageUrl']) || '';
  const defaultEvidence =
    (get(data, ['listProofTransferredMoney']) || []).map((item: any) => ({ ...item, preview: item.imageUrl })) || [];

  const onUploadImage = (formData: any) => {
    return uploadImageAPI(data.id, formData);
  };
  const isDisabled = !isEmpty(defaultEvidence);

  const validationSchema = Yup.object({});
  return (
    <ModalComponent
      wrapClassName="modal-upload-evidence"
      visible={visible}
      width={732}
      onClose={onClose}
      title="Upload Evidence"
    >
      <Row>
        <Formik
          initialValues={{ description: defaultDesc || '', evidences: { fileList: defaultEvidence } }}
          onSubmit={onUpdate}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="pt-4 w-[100%]">
              {/* {console.log('values', values)} */}
              <FormItem
                label="Description"
                required
                name="description"
                placeholder="Description"
                typeInput={TYPE_INPUT.TEXTAREA}
                className="mb-4"
                maxLength={3000}
              />
              <FormItem
                label="Evidences"
                required
                name="evidences"
                placeholder="Evidences"
                typeInput={TYPE_INPUT.UPLOAD}
                className="mb-4"
                multiple
                onUploadImage={onUploadImage}
                disabled={isDisabled}
              />
              <div className="flex w-full justify-between space-x-4 mt-8">
                <Button className="btn-primary h-10 flex-1" htmlType="submit" disabled={isDisabled}>
                  Confirm
                </Button>
                <Button className="btn-secondary h-10 flex-1" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Row>
    </ModalComponent>
  );
};

export default ModalUploadEvidence;
