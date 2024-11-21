import { DataGrid, esES } from "@mui/x-data-grid";
import { Loading } from "../utils/loading";
import { NoFiles } from "../utils/NoFiles";

import { CustomToolbar } from "../utils/CustomToolbar";

export const TableComponent = ({
  columns,
  rowsSet,
  route,
  isError,
  isLoading,
}) => {
  if (isLoading) {
    return <Loading />;
  }
  // if (isError)
  //   return (
  //     <div>
  //       <NoFiles />
  //     </div>
  //   );
   (rowsSet);

  const rows =
    rowsSet != null
      ? rowsSet.map((cls) => ({ ...cls, id: Object.values(cls)[0] }))
      : [];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          sx={{
            padding: "10px",
            border: "none",
            height: "100%",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
            '.MuiTablePagination-displayedRows': {
              'margin-top': '1em',
              'margin-bottom': '1em'
            },
            '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
              'margin-top': '1em',
              'margin-bottom': '1em'
            }
          }}
          // className={`rowsPerPage ${theme == "light" ? "light" : "dark"}`}
          columns={columns}
          rows={rows}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableMultipleRowSelection={true}
          disableColumnSelector={true}
          checkboxSelection={true}
          showCellVerticalBorder={false}
          pageSizeOptions={[5, 10]}
          slots={{
            noRowsOverlay: NoFiles,

            toolbar: () =>
              CustomToolbar({
                data: rows,
                fileName: "archivo",
                route: route,
              }),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>
    </>
  );
};
