import { Upload, Button, Image } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CameraFilled, DeleteOutlined } from '@ant-design/icons';
import showMessage from '../Message';
import AvatarDefault from 'public/images/avatar-default.png';
import { uploadImageAPI } from 'services/buy';

type UploadType = {
  onChange: any;
  maxSizeMB: number;
  maxSize: number;
  listFileTypeSupport: string[];
  setLoading?: any;
  content?: any;
  fileTypeErrorMessage?: string;
  value?: any;
  form?: any;
  field?: any;
  onUploadImage?: any;
  disabled?: boolean;
};
const UploadComponent: FC<UploadType> = ({
  onChange,
  maxSize,
  maxSizeMB,
  listFileTypeSupport,
  setLoading,
  content,
  fileTypeErrorMessage,
  value,
  form,
  field,
  onUploadImage,
  disabled,
}) => {
  const { t } = useTranslation('common');
  const handleCustomRequest = async (props: any) => {
    setTimeout(() => {
      props.onSuccess('ok');
    }, 0);
  };

  const handleChange = async (info: any) => {
    console.log('info', info);
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // onChange(info.file.originFileObj);
      const { file } = info;
      console.log('file', file);
      const formData = new FormData();
      formData.append('proof', file.originFileObj);
      let url = '';
      if (onUploadImage) {
        const response = await onUploadImage(formData);
        console.log('response', response);
        url = `${process.env.NEXT_PUBLIC_API_URL}/${response}`;
      } else {
        url = await URL.createObjectURL(new Blob([file.originFileObj], { type: file.type || 'image/png' }));
      }
      file.preview = url;

      console.log('field.value', field.value);
      form.setFieldValue(field.name, {
        fileList: [...info.fileList],
        // previewContent: [...(field.value.previewContent || []), file.url || file.preview],
      });
    }
    setLoading && setLoading(false);
  };

  const onDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    form.setFieldValue(field.name, {
      fileList: [],
      previewContent: [],
    });
    const inputEle = document.getElementById('upload-evidence');
    console.log('inputEle', inputEle);
    // inputEle?.value = null;
  };

  const handleBeforeUpload = (file: any) => {
    return true;
    if (!listFileTypeSupport.includes(file.type)) {
      showMessage('error', t(fileTypeErrorMessage || 'message.E34'));
      return Upload.LIST_IGNORE;
    } else if (file.size > maxSize) {
      showMessage('error', t('message.E18', { size: maxSizeMB }));
      return Upload.LIST_IGNORE;
    }
    setLoading && setLoading(true);
    return true;
  };

  const defaultContent = (
    <div className="flex items-center flex-wrap">
      {!!field?.value?.fileList?.length &&
        field?.value?.fileList.map((item: any) => (
          <img key={item.preview} src={item.preview} alt="Avatar" className="upload-image" />
        ))}
      {!disabled && (
        <>
          <Button icon={<CameraFilled />} className="button-camera" />
          <Button icon={<DeleteOutlined />} className="button-camera" onClick={onDelete} />
        </>
      )}
    </div>
  );
  return (
    <Upload
      maxCount={10}
      showUploadList={false}
      customRequest={handleCustomRequest}
      onChange={handleChange}
      beforeUpload={handleBeforeUpload}
      multiple
      id="upload-evidence"
      disabled={disabled}
    >
      {content || defaultContent}
    </Upload>
  );
};

export default UploadComponent;
