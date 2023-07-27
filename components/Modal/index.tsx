import React, { Fragment, FC } from 'react';
import { Button, Modal, Typography } from 'antd';
import Image from 'next/image';

import CloseIcon from 'public/svg/close.svg';

const { Title } = Typography;

const ModalComponent: FC<{
  title?: any;
  onClose?: any;
  showCloseIcon?: boolean;
  visible: boolean;
  width?: number | string;
  maskClosable?: boolean;
  wrapClassName?: string;
  getContainer?: any;
  destroyOnClose?: boolean;
}> = ({
  children,
  title,
  onClose,
  showCloseIcon = true,
  width,
  destroyOnClose = true,
  maskClosable,
  visible,
  ...props
}) => {
  return (
    <Modal
      footer={null}
      wrapClassName={'modal'}
      closable={false}
      width={width ?? 565}
      destroyOnClose={destroyOnClose}
      onCancel={onClose}
      maskClosable={maskClosable}
      open={visible}
      {...props}
    >
      <Fragment>
        {showCloseIcon && (
          <Button
            onClick={onClose}
            className="ant-modal-close"
            icon={<Image src={CloseIcon} alt="" width={12} height={12} />}
          />
        )}
        <div className="modal-wrap">
          <Title level={5} className="title">
            {title}
          </Title>
          {children}
        </div>
      </Fragment>
    </Modal>
  );
};

export default ModalComponent;
