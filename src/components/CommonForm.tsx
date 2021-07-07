import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
} from "antd";
import React, {
  FC,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
const { RangePicker } = DatePicker;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]["layout"];
interface FormProps {
  formItemList: any[];
  formLayout?: LayoutType;
  formItemSpan?: number;
  queryForm?: Function;
  resetForm?: Function;
  labelCol?: number;
  wrapperCol?: number;
  slotColSpan?: number;
  formSlot?: any;
  ref?: any;
}
// export interface FormItem {
//   name: string;
//   label: string;
//   placeholder?: string;
//   rules?: object[];
//   render?: React.ReactElement;
// }
function getFormatTime(time) {
  /*
   * eg:format="YYYY-MM-dd hh:mm:ss";
   */
  let type = "yyyy-mm-dd hh:ii:ss";
  var date = new Date(time);
  var o = {
    "m+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "i+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
  };
  if (/(y+)/.test(type)) {
    type = type.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(type)) {
      type = type.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return type;
}

const CommonForm: FC<FormProps> = memo(
  forwardRef((props, ref) => {
    const {
      formLayout,
      formItemList,
      formItemSpan,
      queryForm,
      resetForm,
      labelCol,
      wrapperCol,
      slotColSpan,
    } = props;
    console.log("CommonForm render");

    const [form] = Form.useForm();
    const onFinish = (values: any) => {
      // console.log(
      //   values,
      //   getFormatTime(values.createTime[0]),
      //   values.createTime[0].valueOf()
      // );
      queryForm && queryForm(values);
    };
    const getRules = (formItem) => {
      let itemName = Object.values(formItem)[0];
      let message = "";
      if (formItem.type === "select" || formItem.type === "timeRange") {
        message = `请选择${itemName}`;
      } else if (formItem.type === "file") {
        message = `请上传${itemName}`;
      } else {
        message = `请输入${itemName}`;
      }
      return [
        {
          required: true,
          message: message,
        },
      ];
    };
    const delFormItemList = formItemList.map((item) => {
      item.label = item.label || Object.values(item)[0];
      item.name = item.name || Object.keys(item)[0];
      item.rules = item.rules || (item.isRequired && getRules(item)) || [];
      item.placeholder =
        item.placeholder || item.rules[0]?.message || getRules(item)[0].message;
      return item;
    });
    const onReset = () => {
      console.log(12121, typeof resetForm);

      resetForm && resetForm();
      // form.resetFields();
    };
    const getItemByType = (type, formItem) => {
      if (type === "select") {
        return (
          <Select placeholder={formItem.placeholder}>
            {formItem.optionArr.map((option) => (
              <Option key={option.val} value={option.val}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      } else if (type === "timeRange") {
        return <RangePicker format="YYYY-MM-DD" />;
      } else {
        return <Input placeholder={formItem.placeholder} />;
      }
    };
    useImperativeHandle(ref, () => ({
      validate: form.validateFields,
      reset: form.resetFields,
    }));
    return (
      <Form
        form={form}
        layout={formLayout}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
        onFinish={onFinish}
      >
        <Row>
          {delFormItemList.map((item) => (
            <Col span={formItemSpan} key={Object.keys(item)[0]}>
              <Form.Item label={item.label} name={item.name} rules={item.rules}>
                {item.render ? item.render : getItemByType(item.type, item)}
              </Form.Item>
            </Col>
          ))}
          <Col span={slotColSpan}>{props.formSlot && props.formSlot()}</Col>
        </Row>
      </Form>
    );
  })
);
CommonForm.defaultProps = {
  formItemList: [],
  formLayout: "horizontal",
  formItemSpan: 8,
  labelCol: 8,
  wrapperCol: 16,
  slotColSpan: 8,
};
export default CommonForm;
