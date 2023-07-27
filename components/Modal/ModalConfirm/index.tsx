import React from 'react';
import ModalComponent from '..';
import { Button } from 'antd';

interface IModalConfirmProps {
  onClose: any;
  onConfirm: any;
  visible: boolean;
  title: string;
  description: string;
}

const ModalConfirm = ({ onClose, onConfirm, visible, title, description }: IModalConfirmProps) => {
  return (
    <ModalComponent showCloseIcon onClose={onClose} visible={visible} width={350} destroyOnClose title={title}>
      <div className="flex flex-col item pt-5">
        <p className="text-center">{description}</p>
        <div className="flex items-center justify-center space-x-5 mt-5">
          <Button className="btn-primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button className="btn-secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ModalConfirm;
