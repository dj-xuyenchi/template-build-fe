import { ColumnTypeCustom } from "@/component/TableCustom";
import { excelColumnName } from "@/constant/excelCols";
import ExcelJS, { Worksheet } from "exceljs";
import { saveAs } from "file-saver";

export const exportExcel = async <T extends object>(
  columns: ColumnTypeCustom<T>[],
  dataSource: T[],
  fileName: string | "Export"
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("report");
  genColumns(worksheet, columns);

  // Thêm dòng dữ liệu
  // worksheet.addRow(["Tên", "Tuổi", "Địa chỉ", "Email"]);
  // worksheet.addRow(["John", 30, "Hà Nội", "john@example.com"]);

  // // Style cho dòng header (row 2)
  // const row2 = worksheet.getRow(2);
  // row2.eachCell((cell) => {
  //     cell.font = { bold: true };
  //     cell.alignment = { horizontal: "center" };
  //     cell.border = {
  //         top: { style: "thin" },
  //         bottom: { style: "thin" },
  //         left: { style: "thin" },
  //         right: { style: "thin" },
  //     };
  // });

  // // Tự động canh độ rộng cột
  // worksheet.columns.forEach((col) => {
  //     col.width = 20;
  // });

  // // Xuất file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};

const genColumns = <T>(sheet: Worksheet, columns: ColumnTypeCustom<T>[]) => {
  sheet.mergeCells("A1:D1");
  const headerCell = sheet.getCell("A1");
  // Style cho ô đã merge
  headerCell.value = "BẢNG BÁO CÁO";
  headerCell.font = { size: 16, bold: true, color: { argb: "FFFFFF" } };
  headerCell.alignment = { vertical: "middle", horizontal: "center" };
  headerCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "0070C0" }, // Màu nền xanh dương
  };
  const rowIndex = 2;
  let startCol = excelColumnName[0]; //A
  let mergeSize = 0; 
  columns.forEach((col) => {
     mergeSize += countLeafNodes(col) - 1;
    console.error(
      `${startCol}${rowIndex}:${excelColumnName[mergeSize]}${rowIndex}`
    );
    sheet.mergeCells(
      `${startCol}${rowIndex}:${excelColumnName[mergeSize]}${rowIndex}`
    );
    const cell = sheet.getCell(`${startCol}${rowIndex}`);
    // Style cho ô đã merge
    cell.value = col.title + "";

 //   mergeCell(sheet, col, rowIndex++);
    startCol = excelColumnName[mergeSize + 1];
  });
};

const mergeCell = <T>(
  sheet: Worksheet,
  column: ColumnTypeCustom<T>,
  rowIndex: number
) => {
  if (!column.children || column.children.length <= 1) {
    return;
  }
  let startCol = "A";
  let toCol = "";
  column.children.forEach((col) => {
    const mergeSize = countLeafNodes(col) - 1;
    toCol = excelColumnName[mergeSize];
    console.error(`${startCol}${rowIndex}:${toCol}${rowIndex}`);

    //  sheet.mergeCells(`A${rowIndex}:${excelColumnName[mergeSize]}${rowIndex}`);
    mergeCell(sheet, col, rowIndex++);
    startCol = excelColumnName[mergeSize];
  });
};

const countLeafNodes = <T>(node: ColumnTypeCustom<T>): number => {
  if (!node.children || node.children.length === 0) {
    return 1; // Đây là node lá
  }
  return node.children.reduce((sum: number, child: ColumnTypeCustom<T>) => {
    return sum + countLeafNodes(child);
  }, 0);
};
