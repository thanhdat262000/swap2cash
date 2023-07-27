import { Dispatch } from 'redux';
import { useState } from 'react';

export const useModal = (
  defaultState = false,
): {
  visible: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  setVisible: any;
} => {
  const [visible, setVisible] = useState(defaultState);
  const onOpenModal = () => {
    setVisible(true);
  };
  const onCloseModal = () => {
    setVisible(false);
  };
  return {
    visible,
    onOpenModal,
    onCloseModal,
    setVisible,
  };
};
