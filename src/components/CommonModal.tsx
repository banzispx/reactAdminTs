import React, { FC, memo, useRef, useState } from "react";
import { Modal, Table } from "antd";
import CommonForm from "./CommonForm";

interface CommonModal {
  visible?: boolean;
  handleOk?: (x?, y?) => void;
  handleCancel?: (x?) => void;
  formItemList?: any[];
  labelCol?: number;
  wrapperCol?: number;
}
const CommonModal: FC<CommonModal> = memo(
  ({ visible, handleOk, handleCancel, formItemList, labelCol, wrapperCol }) => {
    const delHandleOk = (val) => {
      formItemList &&
        formRef.current.validate().then((res) => {
          handleOk(res, formRef);
        });
    };
    const delHandleCancel = (val) => {
      formItemList && formRef.current.reset();
      handleCancel();
    };
    const formRef = useRef(null);
    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={delHandleOk}
        onCancel={delHandleCancel}
      >
        {formItemList && (
          <CommonForm
            ref={formRef}
            formItemSpan={24}
            slotColSpan={24}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            formItemList={formItemList}
          />
        )}
      </Modal>
    );
  }
);
CommonModal.defaultProps = {
  visible: false,
  labelCol: 6,
  wrapperCol: 18,
};
export default CommonModal;
