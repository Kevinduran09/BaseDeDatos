import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
export const DownloadXLSX = ({ data, fileName }) => {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button
      variant="text"
      startIcon={<FileDownloadOutlinedIcon />}
      size="small"
      onClick={handleDownload}
    >
      Exportar
    </Button>
  );
};
