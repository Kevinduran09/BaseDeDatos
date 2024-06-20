import { Tooltip,IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export const Actions = ({params,editFuntion,deleteFunction}) => {
  return (
    <>
      <Tooltip title='Editar'>
        <IconButton data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editFuntion(params.row)}>
          <EditIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar'>
        <IconButton onClick={()=>{
         
          let obj = Object.keys(params.row)
          const id = params.row[obj[0]]
          deleteFunction(id)
        }}>
          <DeleteForeverIcon color='error' />
        </IconButton>
      </Tooltip>
    </>
  )
}
