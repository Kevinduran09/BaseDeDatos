import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

export const Table = ({ data, columns, openModal }) => {

    const [searchTerm, setsearchTerm] = useState('')
    const handletInputSearch = (e) => {
        setsearchTerm(e.target.value)
    }
  
    const filterList = data.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )


    return (
        <div className="container-fluid mt-5">
            <div className="row mt-3 justify-content-md-start">
                <div className="col-5 offset-md-2">
                    <button className="btn btn-dark" onClick={() => openModal({})}>
                        <i className="fa-solid fa-circle-plus"> Agregar</i>
                    </button>

                </div>
                <div className="col-3">
                    <form className="d-flex" role="search">
                        <input onChange={handletInputSearch} value={searchTerm} className="form-control me-2" type="search" placeholder="Buscar Cliente..." aria-label="Search" />
                        
                    </form>
                </div>
            </div>



            <div className="row mt-2 justify-content-md-start">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive-sm">
                        <table className="table align-middle table-hover table-bordered text-center shadow p-3 mb-5 bg-body-tertiary rounded">

                            <thead className='table-dark'>
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index} >{column.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {data.length === 0 ? (
                                    <tr  >
                                        <td colSpan={columns.length} className='text-center'>
                                            ¡No hay registros en el sistema!
                                        </td>
                                    </tr>
                                ) : (
                                    filterList.map((item, rowIndex) => (
                                        <tr key={rowIndex} >
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex}>{column.render(item)}</td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            

        </div>

    )
}
