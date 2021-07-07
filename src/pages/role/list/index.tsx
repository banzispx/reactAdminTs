import CommonModal from "@/components/CommonModal";
import { Button, Form } from "antd";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CommonForm from "../../../components/CommonForm";
import CommonTable from "../../../components/CommonTable";
export interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const qs = require("qs");
const baseUrl = "http://localhost:3001/";
const safeobjStatusArr = [
  { label: "未审批", val: -1 },
  { label: "审批不通过", val: 0 },
  // { label: '审批通过', val: 1 },
  { label: "下发失败", val: 2 },
  { label: "下发成功", val: 3 },
];
const safeobjTypeArr = [
  { label: "设备", val: 1 },
  { label: "用户", val: 2 },
  { label: "服务", val: 3 },
];
function filterObj(params) {
  let res = { ...params };
  Object.keys(params).map((item) => {
    if (!params[item]) {
      delete res[item];
    }
  });
  return res;
}
const RoleList = memo(() => {
  // 下面是form的交互逻辑
  const formItemList = useMemo(
    () => [
      { safeobjId: "安全对象ID" },
      {
        safeobjStatus: "安全对象状态",
        type: "select",
        optionArr: safeobjStatusArr,
      },
      {
        safeobjType: "安全对象类型",
        type: "select",
        // isRequired: true,
        optionArr: safeobjTypeArr,
      },
      // { createTime: "添加时间", type: "timeRange", isRequired: true },
    ],
    []
  );
  const [formData, setFormData] = useState({});
  const queryForm = useCallback((params) => {
    setFormData(filterObj(params));
  }, []);
  const formSlot = useCallback(() => {
    return (
      <>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button htmlType="reset" onClick={resetForm}>
          重置
        </Button>
        <Button
          htmlType="reset"
          onClick={() => setAddFormVisable(!addFormVisable)}
        >
          添加
        </Button>
      </>
    );
  }, []);
  const resetForm = useCallback(() => {
    setFormData({});
  }, []);
  // 下面是table的交互逻辑
  const [data, setData] = useState([]);
  const delRow = (row) => {
    console.log(row);
    fetch(`${baseUrl}user/${row.id}`, {
      method: "delete",
    }).then(async (reps) => {
      if (reps.ok) {
        let res = await reps.json();
        getTableData()
        
        // setData([res]);
      }
    });
  };
  const columns = useMemo(
    () => [
      {
        title: "安全对象Id",
        dataIndex: "safeobjId",
        render: (text: string) => <span>{text}</span>,
      },
      {
        title: "安全对象状态",
        dataIndex: "safeobjStatus",
        render: (text) => (
          <span>
            {safeobjStatusArr.filter((item) => item.val === text)[0].label}
          </span>
        ),
      },
      {
        title: "安全对象类型",
        dataIndex: "safeobjType",
        render: (text) => (
          <span>
            {safeobjTypeArr.filter((item) => item.val === text)[0].label}
          </span>
        ),
      },
      {
        title: "描述",
        dataIndex: "description",
      },
      {
        title: "操作",
        render: (row) => {
          // console.log(row);

          return (
            <Button
              type="primary"
              onClick={(e) => {
                delRow(row);
              }}
            >
              删除
            </Button>
          );
        },
      },
    ],
    []
  );
  const [row, setSelected] = useState({ keys: [], rows: [] });
  const delSelected = useCallback((val) => {
    setSelected(val);
  }, []);
  const getTableData = () => {
    fetch(`${baseUrl}user?` + qs.stringify(formData)).then(async (reps) => {
      if (reps.ok) {
        let res = await reps.json();
        console.log(res, "res");
        setData(res);
      }
    });
  };
  useEffect(() => {
    getTableData();
  }, [formData]);
  console.log(row, 5656);
  // 下面是添加数据的逻辑
  const [addFormVisable, setAddFormVisable] = useState(false);
  const addFormItemList = useMemo(
    () => [
      { safeobjId: "安全对象ID", isRequired: true },
      {
        safeobjStatus: "安全对象状态",
        type: "select",
        optionArr: safeobjStatusArr,
        isRequired: true,
      },
      {
        safeobjType: "安全对象类型",
        type: "select",
        isRequired: true,
        optionArr: safeobjTypeArr,
      },
      { description: "描述" },
    ],
    []
  );
  const handleOk = (res, formRef) => {
    fetch(`${baseUrl}user`, {
      method: "post",
      body: JSON.stringify(res),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (reps) => {
      if (reps.ok) {
        let res = await reps.json();
        setAddFormVisable(!addFormVisable);
        formRef.current.reset();
        setData([...data, res]);
      }
    });
  };
  return (
    <div>
      <CommonForm
        formItemSpan={6}
        slotColSpan={6}
        formItemList={formItemList}
        queryForm={queryForm}
        resetForm={resetForm}
        formSlot={formSlot}
      />
      <CommonModal
        visible={addFormVisable}
        formItemList={addFormItemList}
        handleOk={handleOk}
        handleCancel={() => {
          setAddFormVisable(!addFormVisable);
        }}
      />
      <CommonTable data={data} columns={columns} setSelected={delSelected} />
    </div>
  );
});
export default RoleList;
