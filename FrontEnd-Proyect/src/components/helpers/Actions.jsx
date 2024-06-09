import { Box, Tooltip,IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export const Actions = ({params}) => {
  return (
    <>
      <Tooltip title='Editar'>
        <IconButton data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { console.log(params.row.nombre); }}>
          <EditIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar'>
        <IconButton>
          <DeleteForeverIcon color='error' />
        </IconButton>
      </Tooltip>
    </>
  )
}
