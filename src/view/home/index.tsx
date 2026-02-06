import { CascaderCustom } from "@/component/CascaderCustom";
import { CheckBoxGroupCustom } from "@/component/CheckBoxGroupCustom";
import { ColorPickerCustom } from "@/component/ColorPickerCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { DateRangePickerCustom } from "@/component/DateRangeCustom";
import { InputNumberCustom } from "@/component/InputNumberCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { SwitchCustom } from "@/component/SwitchCustom";
import {
  ExtendFunction,
  TableCustom,
  TablePropsCustom,
} from "@/component/TableCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";
import { UploadFileCustom } from "@/component/UploadFileCustom";
import { exportExcel } from "@/util/sexyExportData";
import { CheckboxOptionType, Col, Form, Row, TableColumnProps } from "antd";
import { useState } from "react";

import dayjs from "dayjs";
import { SystemRole } from "@/model/system/SystemRole";
import { Content } from "antd/es/layout/layout";
import { CollapseCustom } from "@/component/CollapseCustom";
import { InputCustom } from "@/component/InputCustom";
import { FormCustom } from "@/component/FormCustom";
import { ButtonCustom } from "@/component/ButtonCustom";
import { encryptRSA } from "@/util/authen-service/rsaEncrypt";

export const Welcome = () => {
  const [form] = Form.useForm();
  const [data, setDate] = useState([
    {
      id: 1,
      input: "ss",
      client: {
        name: "qa",
        salary: 1000,
      },
      datepicker: "2033-2-2",
    },
    { id: 3, input: "ss", datepicker: "2033-2-2" },
    { id: 2, input: "ss", datepicker: "2033-2-2" },
  ]);
  const config = {} as TablePropsCustom<SystemRole>;
  const btn = {
    buttonAddTitle: "Thêm mới",
    buttonAddFunction() { },
    isSupportExport: true,
    handleExportData() {
      exportExcel(columns, data, "hi");
    },
  } as ExtendFunction<object>;
  config.extendFunction = btn;
  const columns = [
    {
      sortNumber: 1,
      title: "input",
      dataIndex: "input",
      key: "input",
      // render: (value: string, record, index: number) => <InputCustom onChange={(e) => {
      //     handleChangeData(e, value, record, index)
      // }} value={value} />,
      children: [
        {
          title: "text",
          dataIndex: "client",
          key: "text",
          width: 400,
          // render: (client: object, record, index: number) => <InputCustom />
        },
        {
          title: "text",
          dataIndex: "client",
          key: "text",
          width: 400,
          children: [
            {
              title: "text",
              dataIndex: "client",
              key: "text",
              width: 400,
              // render: (client: object, record, index: number) => <TextAreaCustom rows={1}
              //     value={client?.name}
              //     onChange={(e) => {
              //         handleChangeData(e, value, record, index)
              //     }} />,
            },
            {
              title: "text",
              dataIndex: "client",
              key: "text",
              width: 400,
              // render: (client: object, record, index: number) => <TextAreaCustom rows={1}
              //     value={client?.name}
              //     onChange={(e) => {
              //         handleChangeData(e, value, record, index)
              //     }} />,
            },
            {
              title: "text",
              dataIndex: "client",
              key: "text",
              width: 400,
              // render: (client: object, record, index: number) => <TextAreaCustom rows={1}
              //     value={client?.name}
              //     onChange={(e) => {
              //         handleChangeData(e, value, record, index)
              //     }} />,
            },
            {
              title: "text",
              dataIndex: "client",
              key: "text",
              width: 400,
              // render: (client: object, record, index: number) => <TextAreaCustom rows={1}
              //     value={client?.name}
              //     onChange={(e) => {
              //         handleChangeData(e, value, record, index)
              //     }} />,
            },
          ],
        },
      ],
    },
    {
      sortNumber: 2,
      title: "text",
      dataIndex: "text",
      key: "text",
      width: 400,
      // render: (value: string, record, index: number) => <TextAreaCustom rows={1} onChange={(e) => {
      //     handleChangeData(e, value, record, index)
      // }} />,
    },
    {
      sortNumber: 3,
      title: "select",
      dataIndex: "age",
      key: "select",
      // render: (value: string, record, index: number) => <SelectCustom
      //     mode="multiple"
      //     options={[{
      //         value: 1,
      //         label: '1'
      //     }]} onChange={(e) => {
      //         handleChangeData(e, value, record, index)
      //     }} />,
    },
    {
      title: "number",
      dataIndex: "number",
      key: "number",
      // render: (value: string, record, index: number) => <InputNumberCustom
      // />,
    },
    {
      title: "cascader",
      dataIndex: "number2",
      key: "cascader",
      // render: (value: string, record, index: number) => <CascaderCustom
      // />,
    },
    {
      title: "checkbox",
      dataIndex: "numbe3r2",
      key: "checkbox",
      // render: (value: string, record, index: number) => <CheckBoxGroupCustom
      //     options={options}
      // />,
    },
    {
      title: "color",
      dataIndex: "nu3mbe3r2",
      key: "color",
      // render: (value: string, record, index: number) => <ColorPickerCustom onChange={handleChangeData}
      // />,
    },
    {
      title: "datepicker",
      dataIndex: "datepicker",
      key: "datepicker",
      // render: (value: string, record, index: number) => <DatePickerCustom onChange={handleChangeData} value={dayjs(value)}
      // />,
    },
    {
      title: "range",
      dataIndex: "range",
      width: 400,
      key: "range",
      // render: (value: string, record, index: number) => <DateRangePickerCustom onChange={handleChangeData}
      // />,
    },
    {
      title: "switch",
      dataIndex: "switch",
      key: "switch",
      // render: (value: string, record, index: number) => <SwitchCustom onChange={handleChangeData}
      // />,
    },
    {
      title: "upload",
      dataIndex: "upload",
      key: "upload",
      // render: (value: string, record, index: number) => <UploadFileCustom maxCount={10}
      // />,
    },
  ];
  config.columns = columns;
  // config.dataSource = data
  // const handleChangeData = (event, value, record, index) => {
  //     console.log(event);

  // }

  const options: CheckboxOptionType<string>[] = [
    { label: "Apple", value: "Apple", className: "label-1" },
  ];

  const onFinish = (values: object) => {
    console.error(encryptRSA("1231234"));
    // console.log('Submitted values:', values)
  };
  return (
    <>
      <Content
        style={{
          marginBottom: "12px !important",
          padding: "0px 24px 0px 24px ",
          margin: 0,
          background: "white",
          borderRadius: "3px",
        }}
      >
        <CollapseCustom
          noBorder={true}
          items={[
            {
              key: "1",
              label: "Tìm kiếm",
              children: (
                <>
                  <FormCustom layout="vertical" form={form} onFinish={onFinish}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          name={"ss"}
                          required
                          tooltip="This is a required field"
                          rules={[
                            { required: true, message: "Vui lòng nhập tên" },
                          ]}
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Field A"
                          required
                          tooltip="This is a required field"
                        >
                          <InputCustom placeholder="input placeholder" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item>
                      <ButtonCustom htmlType="submit" title="Tìm kiếm" />
                    </Form.Item>
                  </FormCustom>
                </>
              ),
            },
          ]}
        />
      </Content>

      <Content
        style={{
          padding: "0px 24px 0 24px ",
          margin: 0,
          background: "white",
          borderRadius: "3px",
        }}
      >
        {/* <TableCustom scroll={{
                    x: true
                }} 
                
                    fixedCollap={true}
                    {...config} /> */}
      </Content>
    </>
  );
};
