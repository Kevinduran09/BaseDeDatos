import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { DownloadXLSX } from "./DownloadXLSX";
export const CustomToolbar = ({ data, fileName, route }) => {
  const navegate = useNavigate();
  return (
    <GridToolbarContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "2px",
        }}
      >
        <div>
          <Button
            startIcon={<AddIcon />}
            color="primary"
            variant="text"
            onClick={() => navegate(route)}
          >
            Agregar nuevo
          </Button>
          <DownloadXLSX data={data} fileName={fileName} />
          <GridToolbarFilterButton />
        </div>
      </div>
    </GridToolbarContainer>
  );
};
