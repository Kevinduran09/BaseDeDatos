import { GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DownloadXLSX } from './DownloadXLSX';
export const Toolbar = ({ data, fileName,reset }) => {
  return (
      <GridToolbarContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '2px' }}>

              <div>
                  <Button onClick={()=>reset()} variant="text" size="small" startIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar</Button>
                  <DownloadXLSX data={data} fileName={fileName} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <GridToolbarQuickFilter />
              </div>
          </div>
      </GridToolbarContainer>
  )
}
