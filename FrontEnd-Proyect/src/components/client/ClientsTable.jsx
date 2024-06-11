import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Toolbar } from '../helpers/Toolbar';



export const ClientsTable = ({data,columns}) => {
    
    const totalWidth = columns.reduce((acc, column) => acc + column.width, 0);
  return (
      <div className="container d-flex justify-content-center">
         
              <Box sx={{ width: `${totalWidth + 30}px` }}>
                  <DataGrid
                      columns={columns}
                      rows={data}
                    
                      initialState={{
                          pagination: { paginationModel: { pageSize: 5 } },
                      }}
                      rowSelection={false}
                      disableMultipleRowSelection={true}
                      disableColumnSelector={true}
                      disableRowSelectionOnClick
                      showCellVerticalBorder={false}
                      autoHeight={true}
                  slots={{ toolbar: Toolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                ...{
                                    data:data,
                                    fileName:"archivo"
                                }
                            },
                        }}
                  />
              </Box>
        
      </div>
  )
}










// import React, { useEffect, useState } from 'react';
// import { Table } from '../tablecomponents/TableComponent';
// import { ModalComponent } from '../tablecomponents/ModalComponent';
// import { getClients, deleteClient, createClient, updateClient } from '../../../Api/ClientAPI';
// import { show_alert } from '../../functions';
// import { ClientFormComponent } from './ClientFormComponent';

// export const ClientsTable = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedClient, setSelectedClient] = useState({});
//     const [clients, setClients] = useState([]);
//     const [formData, setFormData] = useState({}); 
//     const [updateMode, setUpdateMode] = useState(false);
//     useEffect(() => {
//         fetchClients();
//     }, []);

//     const fetchClients = async () => {
//         try {
//             const response = await getClients();
//             const data = response.data.data || []
//             setClients(data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

    

//     const deleteClientHandler = async (id) => {
//         try {
//             await deleteClient(id);
            
//             show_alert(`Se eliminó el registro de ID : ${id}`, "success");
//             fetchClients();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const saveClient = async () => {
      
//         try {
//             if (updateMode) {
//                 await updateClientHandler();
//                 show_alert(`Se Actualizo el registro de ID : ${id}`, "success");
//             } else {
//                 console.log(formData);
//                 await createClient(formData);
//                 show_alert("Se guardó con éxito", "success");
//             }
            
//             fetchClients();
          
//             closeModal();
//         } catch (error) {
//             console.error(error);
         
//         }
//     };
//     const updateClientHandler = async () => {
//         try {
//             await updateClient(formData, formData.idCliente);
//             show_alert("Se actualizó con éxito", "success");
//             fetchClients();
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     const openModal = (client) => {
        
//         if (!Object.keys(client).length) {
//             setUpdateMode(false);
//             setSelectedClient({})
//             setFormData({})
//         } else {
            
//             setUpdateMode(true);
//             setSelectedClient(client);
            
//             setFormData(client)
//         }
        
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setSelectedClient({});
//         setIsModalOpen(false);
//     };
//     const columns = [
//         { header: 'ID', render: client => client.idCliente },
//         { header: 'Nombre', render: client => client.nombre },
//         { header: 'Apellido', render: client => client.apellido },
//         { header: 'Correo', render: client => client.correoElectronico },
//         { header: 'Usuario', render: client => client.nombreUsuario },
//         { header: 'Cédula', render: client => client.cedula },
//         {header: 'telefono', render: client => client.telefono},
//         {
//             header: 'Acciones', render: (client) => (
//                 <>
//                     <button className='btn btn-warning ms-2' onClick={() => openModal(client)} >
//                         <i className="fa-solid fa-edit"></i>
//                     </button>

//                     <button onClick={() => deleteClientHandler(client.idCliente)} className='btn btn-danger ms-2'>
//                         <i className="fa-solid fa-trash "></i>
//                     </button>
//                 </>
//             )
//         }
//     ];

//     return (
//         <>

            
//             <ClientFormComponent/>
//             <Table data={clients} columns={columns} header={"Registro de clientes"} openModal={openModal} />
//             {isModalOpen &&
                
//                 (<ModalComponent title={'Registro de Clientes'} closeModal={closeModal} onSave={saveClient} isUpdate={updateMode} >
//                     <>
//                         <input type="hidden" id="idCliente" />
//                         <div className="row">
//                             <div className="col mb-3">
//                                 <label htmlFor="nombre" className="form-label">Nombre</label>
//                                 <input
//                                     type="text"
//                                     id="nombre"
//                                     className="form-control"
//                                     placeholder="Nombre del cliente"
//                                 value={formData.nombre}
//                                     onChange={handleChange}
//                                     name="nombre"
//                                 />
//                             </div>
//                             <div className="col mb-3">
//                                 <label htmlFor="apellido" className="form-label">Apellido</label>
//                                 <input
//                                     type="text"
//                                     id="apellido"
//                                     className="form-control"
//                                     placeholder="Apellido del cliente"
//                                     value={formData.apellido}
//                                     onChange={handleChange}
//                                     name="apellido"
//                                 />
//                             </div>
//                             <div className="col mb-3">
//                                 <label htmlFor="correo" className="form-label">Correo electrónico</label>
//                                 <input
//                                     type="email"
//                                     id="correo"
//                                     className="form-control"
//                                     placeholder="Correo electrónico"
//                                 value={formData.correoElectronico}
//                                     onChange={handleChange}
//                                     name="correoElectronico"
//                                 />
//                             </div>
//                         </div>
//                     <div className="row">
//                         <div className="col mb-3">
//                             <label htmlFor="nombreUsuario" className="form-label">Usuario</label>
//                             <input
//                                 type="text"
//                                 id="nombreUsuario"
//                                 className="form-control"
//                                 placeholder="Nombre usuario"
//                                 value={formData.nombreUsuario}
//                                 onChange={handleChange}
//                                 name="nombreUsuario"
//                             />
//                         </div>
//                         <div className="col mb-3">
//                             <label htmlFor="cedula" className="form-label">Cedula</label>
//                             <input
//                                 type="text"
//                                 id="cedula"
//                                 className="form-control"
//                                 placeholder="Cedula del cliente"
//                                 value={formData.cedula}
//                                 onChange={handleChange}
//                                 name="cedula"
//                             />
//                         </div>
//                         <div className="col mb-3">
//                             <label htmlFor="contrasena" className="form-label">Contraseña</label>
//                             <input
//                                 type="text"
//                                 id="contrasena"
//                                 className="form-control"
//                                 placeholder="Cedula del cliente"
//                                 value={formData.contrasena}
//                                 onChange={handleChange}
//                                 name="contrasena"
//                             />
//                         </div>
//                         <div className="col mb-3">
//                             <label htmlFor="telefono" className="form-label">Telefono</label>
//                             <input
//                                 type="text"
//                                 id="telefono"
//                                 className="form-control"
//                                 placeholder="telefono del cliente"
//                                 value={formData.telefono}
//                                 onChange={handleChange}
//                                 name="telefono"
//                             />
//                         </div>
//                     </div>
//                     </>
//                 </ModalComponent>)}
//         </>
//     );
// };
