import React, { useState } from "react";
import { CheckboxChangeEvent, Col, Popover, Row } from "antd";
import { ButtonCustom } from "../ButtonCustom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CardCustom } from "../CardCustom";
import { TiTick } from "react-icons/ti";
import { CheckBoxCustom } from "../CheckBoxCustom";

export interface ExpandColumnBtnPopverProps {
  title: string;
  columnList: OptionColumnExpand[];
  handleExpandColumns: (keys: string[], toCol: string) => void;
  toCol: string;
  backCol: string;
  disable?: boolean;
  positionDisplay?: "left" | "right" | "top" | "bottom";
}
export const ExpandColumnBtnPopver = ({
  title,
  positionDisplay,
  columnList,
  toCol,
  backCol,
  handleExpandColumns,
}: ExpandColumnBtnPopverProps) => {
  const [open, setOpen] = useState(false);
  const [colIndexNameList, setColIndexNameList] = useState([] as string[]);
  const [isExpand, setIsExpand] = useState(false);

  const handleCheckCol = (isChecked: boolean, indexName: string) => {
    if (indexName == "all") {
      if (isChecked) {
        setColIndexNameList([
          ...columnList.map((opt) => {
            return opt.columnIndexName;
          }),
        ]);
      } else {
        setColIndexNameList([]);
      }
      return;
    }

    if (colIndexNameList.includes(indexName)) {
      const idx = colIndexNameList.indexOf(indexName);
      if (idx !== -1) {
        colIndexNameList.splice(idx, 1);
        setColIndexNameList([...colIndexNameList]);
      }
    } else {
      setColIndexNameList([...colIndexNameList, indexName]);
    }
  };
  const handleOpenChange = (newOpen: boolean) => {
    if (isExpand) {
      handleExpandColumns(colIndexNameList, backCol);
      setIsExpand(false);
    } else {
      setOpen(newOpen);
    }
  };
  const handleExpand = () => {
    setIsExpand(true);
  };
  const handleOpenClose = (action: boolean) => {
    setOpen(action);
  };

  return (
    <Popover
      content={
        <ContenFill
          indexNameList={colIndexNameList}
          handleCheckCol={handleCheckCol}
          handleExpandColumns={handleExpandColumns}
          handleExpand={handleExpand}
          handleOpenClose={handleOpenClose}
          toCol={toCol}
          content={columnList}
          title={title}
        />
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement={positionDisplay || "rightTop"}
    >
      {!isExpand ? (
        <ButtonCustom
          size="small"
          style={{
            marginLeft: "12px",
            borderRadius: "3px",
            height: 18,
            width: 18,
          }}
          icon={open ? <FiMinus /> : <FiPlus />}
        ></ButtonCustom>
      ) : (
        <ButtonCustom
          size="small"
          style={{
            marginLeft: "12px",
            borderRadius: "3px",
            height: 18,
            width: 18,
          }}
          icon={<FiMinus />}
        ></ButtonCustom>
      )}
    </Popover>
  );
};

const ContenFill = ({
  title,
  content,
  indexNameList,
  toCol,
  handleCheckCol,
  handleExpandColumns,
  handleExpand,
  handleOpenClose,
}: {
  indexNameList: string[];
  title: string;
  content: OptionColumnExpand[];
  toCol: string;
  handleCheckCol: (isChecked: boolean, indexName: string) => void;
  handleExpandColumns: (keys: string[], toCol: string) => void;
  handleExpand: () => void;
  handleOpenClose: (action: boolean) => void;
}) => {
  const handleOnchange = (event: CheckboxChangeEvent, indexName: string) => {
    handleCheckCol(event.target.checked, indexName);
  };
  const handleClickExpand = () => {
    if (indexNameList.length == 0) {
      handleOpenClose(false);
      return;
    }
    handleExpandColumns(indexNameList, toCol);
    handleExpand();
    handleOpenClose(false);
  };

  return (
    <>
      <div className="expand-col-popver">
        <CardCustom
          style={{ width: 300 }}
          title={title}
          extra={
            <ButtonCustom
              icon={<TiTick />}
              size="small"
              type="primary"
              title="Đồng ý"
              onClick={handleClickExpand}
            />
          }
        >
          <Row gutter={[0, 6]}>
            <Col span={24}>
              <CheckBoxCustom
                checked={indexNameList.length == content.length}
                title={"Tất cả"}
                onChange={(event) => {
                  handleOnchange(event, "all");
                }}
              />
            </Col>
            {content.map((colOption, index) => {
              return (
                <Col span={12} key={index}>
                  <CheckBoxCustom
                    checked={
                      indexNameList.includes("all") ||
                      indexNameList.includes(colOption.columnIndexName)
                    }
                    title={colOption.columnName}
                    onChange={(event) => {
                      handleOnchange(event, colOption.columnIndexName);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </CardCustom>
      </div>
    </>
  );
};

export interface OptionColumnExpand {
  columnName: string;
  columnIndexName: string;
}
